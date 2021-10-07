import assert from 'assert';
import dayjs from 'dayjs';
import { newEntry } from '../../domain/Entry';
import * as entryRepository from '../entryRepository';
import { begin, rollback } from '../postgres';

describe('Query:entriesRepository', () => {
  const entry1 = newEntry({
    text: 'これは最新の記事です。',
    createdAt: dayjs(),
  });
  const entry2 = newEntry({
    text: 'これは一つ前の記事です。',
    tags: ['タグ1', 'タグ2'],
    createdAt: dayjs().subtract(1, 'm'),
  });
  const entry3 = newEntry({
    text: 'これは二つ前の記事です。',
    tags: ['タグ1', 'タグ2'],
    createdAt: dayjs().subtract(2, 'm'),
  });

  before(async () => {
    await begin();
    await entryRepository.createOne({ entry: entry1 });
    await entryRepository.createOne({ entry: entry2 });
  });

  it('readMany', async () => {
    const entries = await entryRepository.readMany({ limit: 1, offset: 1 });
    assert.strictEqual(entries.length, 1);
    assert.strictEqual(entries[0].text, entry2.text);
  });

  it('readByKeyword', async () => {
    const entries = await entryRepository.readByKeyword({
      keyword: '。',
      limit: 1,
      offset: 1,
    });
    assert.strictEqual(entries.length, 1);
    assert.strictEqual(entries[0].text, entry2.text);
  });
  it('readByKeyword:emptyKeyword', async () => {
    const entries = await entryRepository.readByKeyword({
      keyword: '',
      limit: 1,
    });
    // same as readMany
    assert.strictEqual(entries[0].text, entry1.text);
  });

  it('readByTag', async () => {
    const entries = await entryRepository.readByTag({
      tag: 'タグ1',
      limit: 1,
    });
    assert.strictEqual(entries[0].text, entry2.text);
  });
  it('readByTag:withKeyword', async () => {
    const entries = await entryRepository.readByTag({
      tag: 'タグ1',
      keyword: 'これは',
      limit: 1,
    });
    assert.strictEqual(entries[0].text, entry2.text);
  });

  it('readByDate', async () => {
    const entries = await entryRepository.readByDate({
      since: dayjs(entry3.createdAt).add(1, 's').toDate(),
      until: dayjs(entry1.createdAt).subtract(1, 's').toDate(),
      limit: 3,
    });
    assert.strictEqual(entries.length, 1);
    assert.strictEqual(entries[0].text, entry2.text);
  });

  it('readOne', async () => {
    const entry = await entryRepository.readOne({ uuid: entry1.uuid });
    assert.strictEqual(entry?.text, entry1.text);
  });

  it('readOne:empty', async () => {
    const result = await entryRepository.readOne({
      uuid: 'thisisadummyuuidthisisadummyuuid',
    });
    assert.strictEqual(result, undefined);
  });

  it('readTagList', async () => {
    const tagList = await entryRepository.readTagList();
    assert.ok(tagList.includes(entry2.tags[0]));
  });

  after(() => rollback());
});

describe('Mutation:entriesRepository', () => {
  beforeEach(() => begin());

  it('createOne', async () => {
    const entry = newEntry({
      text: 'これはサンプルの記事です。',
      tags: ['タグ1', 'タグ2'],
    });
    const rowCounts = await entryRepository.createOne({ entry });
    assert.deepStrictEqual(rowCounts, [1, 2]);
  });

  it('createOne:noTag', async () => {
    const entry = newEntry({ text: 'これはタグのない記事です。' });
    const rowCounts = await entryRepository.createOne({ entry });
    assert.deepStrictEqual(rowCounts, [1]);
  });

  it('createMany', async () => {
    const entry1 = newEntry({
      text: 'これは１つ目の記事です。',
      tags: ['タグ1'],
      createdAt: dayjs().subtract(1, 's'),
    });
    const entry2 = newEntry({
      text: 'これは２つ目の記事です。',
      tags: ['タグ1', 'タグ2', 'タグ3'],
    });
    const rowCounts = await entryRepository.createMany({
      entries: [entry1, entry2],
    });
    assert.deepStrictEqual(rowCounts, [2, 1, 3]);
  });

  it('updateOne', async () => {
    const oldEntry = newEntry({
      text: 'これはサンプルの記事です。',
      tags: ['タグ1', 'タグ2'],
    });
    await entryRepository.createOne({ entry: oldEntry });
    const updatedEntry = newEntry({
      text: 'これは更新された記事です。',
      tags: ['新しいタグ1', '新しいタグ2'],
      uuid: oldEntry.uuid,
    });
    await entryRepository.updateOne({ entry: updatedEntry });
    const resultEntry = await entryRepository.readOne({
      uuid: oldEntry.uuid,
    });
    assert.strictEqual(resultEntry?.text, updatedEntry.text);
    assert.deepStrictEqual(resultEntry?.tags, updatedEntry.tags);
  });

  it('deleteOne', async () => {
    const entry = newEntry({
      text: 'これはサンプルの記事です。',
      tags: ['タグ1', 'タグ2'],
    });
    await entryRepository.createOne({ entry });
    await entryRepository.deleteOne({ uuid: entry.uuid });
    const resultEntry = await entryRepository.readOne({ uuid: entry.uuid });
    assert.strictEqual(resultEntry, undefined);
  });

  it('deleteAll', async () => {
    const entry1 = newEntry({
      text: 'これは１つ目の記事です。',
      tags: ['タグ1'],
      createdAt: dayjs().subtract(1, 's'),
    });
    const entry2 = newEntry({
      text: 'これは２つ目の記事です。',
      tags: ['タグ1', 'タグ2', 'タグ3'],
    });
    await entryRepository.createMany({
      entries: [entry1, entry2],
    });
    await entryRepository.deleteAll();
    const entries = await entryRepository.readMany({ limit: 2 });
    assert.strictEqual(entries.length, 0);
  });

  afterEach(() => rollback());
});
