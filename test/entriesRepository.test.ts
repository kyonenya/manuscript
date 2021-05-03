import assert from 'assert';
import * as entriesRepository from '../app/entriesRepository';

describe('entriesRepository', () => {
  it('select', async () => {
    const entries = await entriesRepository.selectAll({ limit: 1 });
    assert.strictEqual(entries.length, 1);
    console.log(entries);
  });
});
