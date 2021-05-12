import assert from 'assert';
import * as entryRepository from '../app/entryRepository';
import { begin, rollback } from '../app/postgres';
import { toEntry } from '../app/Entry';

describe('queries_entriesRepository', () => {
  before(async () => {
    await begin();
    const entry1 = toEntry({
      text: 'これは一つ目のサンプルの記事です。',
      tags: ['タグ1', 'タグ2'],
    });
    const entry2 = toEntry({
      text: 'これは二つ目のサンプルの記事です。',
    });
    await entryRepository.createOne({ entry: entry1 });
    await entryRepository.createOne({ entry: entry2 });
  });

  it('readMany', async () => {
    const entries = await entryRepository.readMany({ limit: 1 });
    assert.strictEqual(entries.length, 1);
  });

  it('findByKeyword', async () => {
    const keyword = '。';
    const entries = await entryRepository.findByKeyword({ keyword, limit: 1 });
    assert.strictEqual(entries.length, 1);
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

  afterEach(() => rollback());
});
