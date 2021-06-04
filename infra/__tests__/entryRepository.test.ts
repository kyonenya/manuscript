import assert from 'assert';
import dayjs from 'dayjs';
import { toEntry } from '../../domain/Entry';
import * as entryRepository from '../entryRepository';
import { begin, rollback } from '../postgres';

describe('queries_entriesRepository', () => {
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

  it('readMany', async () => {
    const entries = await entryRepository.readMany({ limit: 1, offset: 1 });
    assert.strictEqual(entries.length, 1);
    assert.strictEqual(entries[0].text, olderEntry.text);
  });

  it('readOne', async () => {
    const entry = await entryRepository.readOne({ uuid: newestEntry.uuid });
    assert.strictEqual(entry.text, newestEntry.text);
  });

  it('searchKeyword', async () => {
    const entries = await entryRepository.searchKeyword({
      keyword: '。',
      limit: 1,
      offset: 1,
    });
    assert.strictEqual(entries.length, 1);
    assert.strictEqual(entries[0].text, olderEntry.text);
  });
  it('searchKeyword_emptyKeyword', async () => {
    const entries = await entryRepository.searchKeyword({
      keyword: '',
      limit: 1,
    });
    // same as readMany
    assert.strictEqual(entries[0].text, newestEntry.text);
  });

  after(() => rollback());
});

describe('mutation_entriesRepository', () => {
  beforeEach(() => begin());

  it('createOne', async () => {
    const entry = toEntry({
      text: '新規作成された記事の本文',
      tags: ['タグ1', 'タグ2'],
    });
    const rowCounts = await entryRepository.createOne({ entry });
    assert.deepStrictEqual(rowCounts, [1, 2]);
  });

  it('deleteOne', async () => {
    const entry = toEntry({
      text: '新規作成された記事の本文',
      tags: ['タグ1', 'タグ2'],
    });
    await entryRepository.createOne({ entry });
    const rowCounts = await entryRepository.deleteOne({ uuid: entry.uuid });
    assert.deepStrictEqual(rowCounts, [2, 1]);
  });

  afterEach(() => rollback());
});
