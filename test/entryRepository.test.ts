import assert from 'assert';
import * as entryRepository from '../app/entryRepository';
import { begin, rollback } from '../app/postgres';
import { Entry } from '../app/Entry';

describe('entriesRepository', () => {
  beforeEach(() => begin());
  afterEach(() => rollback());

  it('selectAll', async () => {
    const entries = await entryRepository.selectAll({ limit: 1 });
    assert.strictEqual(entries.length, 1);
  });

  it('createOne', async () => {
    const entry = new Entry({
      text: '新規作成された記事の本文',
      tags: ['新規記事タグ1', '新規記事タグ2'],
    });
    const rowCounts = await entryRepository.createOne({ entry });
    assert.deepStrictEqual(rowCounts, [1, 2]);
  });
});
