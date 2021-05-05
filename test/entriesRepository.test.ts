import assert from 'assert';
import * as entryRepository from '../app/entryRepository';
import { Entry } from '../app/Entry';

describe('entriesRepository', () => {
  it('selectAll', async () => {
    const entries = await entryRepository.selectAll({ limit: 1 });
    assert.strictEqual(entries.length, 1);
    console.log(entries);
  });
  it('createOne', async () => {
    const entry = new Entry({
      text: '新規作成された記事の本文',
      tags: ['新規記事タグ1', '新規記事タグ2'],
    });
    await entryRepository.createOne({ entry, shouldCommit: false });
  });
});
