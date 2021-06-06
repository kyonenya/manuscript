import assert from 'assert';
import dayjs from 'dayjs';
import { toEntry } from '../../domain/Entry';
import * as entryRepository from '../entryRepository';
import { begin, rollback } from '../postgres';

describe('Query:entriesRepository', () => {
  const olderEntry = toEntry({
    text: 'これは過去の記事です。',
    createdAt: dayjs().subtract(1, 's'),
  });
  const newestEntry = toEntry({
    text: 'これは最新の記事です。',
    tags: ['タグ1', 'タグ2'],
    createdAt: dayjs(),
  });

  before(async () => {
    await begin();
    await entryRepository.createOne({ entry: olderEntry });
    await entryRepository.createOne({ entry: newestEntry });
  });

  it('selectMany', async () => {
    const entries = await entryRepository.selectMany({ limit: 1, offset: 1 });
    assert.strictEqual(entries.length, 1);
    assert.strictEqual(entries[0].text, olderEntry.text);
  });

  it('selectOne', async () => {
    const entry = await entryRepository.selectOne({ uuid: newestEntry.uuid });
    assert.strictEqual(entry?.text, newestEntry.text);
  });

  it('selectOne:empty', async () => {
    const result = await entryRepository.selectOne({
      uuid: 'thisisadummyuuidthisisadummyuuid',
    });
    assert.strictEqual(result, undefined);
  });

  it('selectByKeyword', async () => {
    const entries = await entryRepository.selectByKeyword({
      keyword: '。',
      limit: 1,
      offset: 1,
    });
    assert.strictEqual(entries.length, 1);
    assert.strictEqual(entries[0].text, olderEntry.text);
  });
  it('searchKeyword:emptyKeyword', async () => {
    const entries = await entryRepository.selectByKeyword({
      keyword: '',
      limit: 1,
    });
    // same as readMany
    assert.strictEqual(entries[0].text, newestEntry.text);
  });

  after(() => rollback());
});

describe('Mutation:entriesRepository', () => {
  beforeEach(() => begin());

  it('createOne', async () => {
    const entry = toEntry({
      text: '新規作成された記事の本文',
      tags: ['タグ1', 'タグ2'],
    });
    const rowCounts = await entryRepository.createOne({ entry });
    assert.deepStrictEqual(rowCounts, [1, 2]);
  });

  it('updateOne', async () => {
    const oldEntry = toEntry({
      text: '新規作成された記事の本文',
    });
    await entryRepository.createOne({ entry: oldEntry });
    const newEntry = toEntry({
      text: '更新された記事の本文',
      tags: ['タグ1', 'タグ2'],
      uuid: oldEntry.uuid,
    });
    await entryRepository.updateOne({ entry: newEntry });
    const resultEntry = await entryRepository.selectOne({
      uuid: oldEntry.uuid,
    });
    assert.strictEqual(resultEntry?.text, newEntry.text);
    assert.deepStrictEqual(resultEntry?.tags, newEntry.tags);
  });

  it('deleteOne', async () => {
    const entry = toEntry({
      text: '新規作成された記事の本文',
      tags: ['タグ1', 'タグ2'],
    });
    await entryRepository.createOne({ entry });
    await entryRepository.deleteOne({ uuid: entry.uuid });
    const result = await entryRepository.selectOne({ uuid: entry.uuid });
    assert.strictEqual(result, undefined);
  });

  afterEach(() => rollback());
});
