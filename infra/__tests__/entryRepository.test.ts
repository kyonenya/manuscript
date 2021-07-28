import assert from 'assert';
import dayjs from 'dayjs';
import { toEntry } from '../../domain/Entry';
import * as entryRepository from '../entryRepository';
import { begin, rollback } from '../postgres';

describe('Query:entriesRepository', () => {
  const olderEntry = toEntry({
    text: 'これは過去の記事です。',
    tags: ['タグ1', 'タグ2'],
    createdAt: dayjs().subtract(1, 'm'),
  });
  const newestEntry = toEntry({
    text: 'これは最新の記事です。',
    createdAt: dayjs(),
  });

  before(async () => {
    await begin();
    await entryRepository.createOne({ entry: olderEntry });
    await entryRepository.createOne({ entry: newestEntry });
  });

  it('readMany', async () => {
    const entries = await entryRepository.readMany({ limit: 1, offset: 1 });
    assert.strictEqual(entries.length, 1);
    assert.strictEqual(entries[0].text, olderEntry.text);
  });

  it('readOne', async () => {
    const entry = await entryRepository.readOne({ uuid: newestEntry.uuid });
    assert.strictEqual(entry?.text, newestEntry.text);
  });

  it('readOne:empty', async () => {
    const result = await entryRepository.readOne({
      uuid: 'thisisadummyuuidthisisadummyuuid',
    });
    assert.strictEqual(result, undefined);
  });

  it('readByKeyword', async () => {
    const entries = await entryRepository.readByKeyword({
      keyword: '。',
      limit: 1,
      offset: 1,
    });
    assert.strictEqual(entries.length, 1);
    assert.strictEqual(entries[0].text, olderEntry.text);
  });
  it('readByKeyword:emptyKeyword', async () => {
    const entries = await entryRepository.readByKeyword({
      keyword: '',
      limit: 1,
    });
    // same as readMany
    assert.strictEqual(entries[0].text, newestEntry.text);
  });

  it('readByTag', async () => {
    const entries = await entryRepository.readByTag({
      tag: 'タグ1',
      limit: 1,
    });
    assert.strictEqual(entries[0].text, olderEntry.text);
  });
  it('readByTag:withKeyword', async () => {
    const entries = await entryRepository.readByTag({
      tag: 'タグ1',
      keyword: 'これは',
      limit: 1,
    });
    assert.strictEqual(entries[0].text, olderEntry.text);
  });

  it('readTagList', async () => {
    const tagList = await entryRepository.readTagList();
    assert.ok(tagList.includes(olderEntry.tags[0]));
  });

  after(() => rollback());
});

describe('Mutation:entriesRepository', () => {
  beforeEach(() => begin());

  it('createOne', async () => {
    const entry = toEntry({
      text: 'これはサンプルの記事です。',
      tags: ['タグ1', 'タグ2'],
    });
    const rowCounts = await entryRepository.createOne({ entry });
    assert.deepStrictEqual(rowCounts, [1, 2]);
  });

  it('createOne:noTag', async () => {
    const entry = toEntry({ text: 'これはタグのない記事です。' });
    const rowCounts = await entryRepository.createOne({ entry });
    assert.deepStrictEqual(rowCounts, [1]);
  });

  it('createAll', async () => {
    const entry1 = toEntry({
      text: 'これは１つ目の記事です。',
      tags: ['タグ1'],
      createdAt: dayjs().subtract(1, 's'),
    });
    const entry2 = toEntry({
      text: 'これは２つ目の記事です。',
      tags: ['タグ1', 'タグ2', 'タグ3'],
    });
    const rowCounts = await entryRepository.createAll({
      entries: [entry1, entry2],
    });
    assert.deepStrictEqual(rowCounts, [2, 1, 3]);
  });

  it('updateOne', async () => {
    const oldEntry = toEntry({
      text: 'これはサンプルの記事です。',
      tags: ['タグ1', 'タグ2'],
    });
    await entryRepository.createOne({ entry: oldEntry });
    const newEntry = toEntry({
      text: 'これは更新された記事です。',
      tags: ['新しいタグ1', '新しいタグ2'],
      uuid: oldEntry.uuid,
    });
    await entryRepository.updateOne({ entry: newEntry });
    const resultEntry = await entryRepository.readOne({
      uuid: oldEntry.uuid,
    });
    assert.strictEqual(resultEntry?.text, newEntry.text);
    assert.deepStrictEqual(resultEntry?.tags, newEntry.tags);
  });

  it('deleteOne', async () => {
    const entry = toEntry({
      text: 'これはサンプルの記事です。',
      tags: ['タグ1', 'タグ2'],
    });
    await entryRepository.createOne({ entry });
    await entryRepository.deleteOne({ uuid: entry.uuid });
    const resultEntry = await entryRepository.readOne({ uuid: entry.uuid });
    assert.strictEqual(resultEntry, undefined);
  });

  afterEach(() => rollback());
});
