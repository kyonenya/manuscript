import assert from "assert";
import * as entriesRepository from '../app/entriesRepository';

describe('entriesRepository', () => {
  it('2 + 3', () => {
    assert.strictEqual(2 + 3, 5);
  });
  it('readAll', async () => {
    const entries = await entriesRepository.selectAll({ limit: 3 });
  });
});
