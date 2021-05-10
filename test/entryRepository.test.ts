import assert from 'assert';
import * as entryRepository from '../app/entryRepository';
import { begin, rollback } from '../app/postgres';
import { toEntry } from '../app/Entry';

describe('query_entriesRepository', () => {
  it('selectAll', async () => {
    const entries = await entryRepository.selectAll({ limit: 1 });
    assert.strictEqual(entries.length, 1);
  });
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
