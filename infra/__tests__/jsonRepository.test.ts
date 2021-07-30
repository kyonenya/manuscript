import assert from 'assert';
import path from 'path';
import { readAll } from '../jsonRepository';

describe('jsonRepository', () => {
  it('readAll', async () => {
    const dayOneEntries = await readAll(
      path.resolve(__dirname, '210320_dayone.json')
    );
    assert.ok(
      dayOneEntries.find(
        (entry) => entry.uuid === '8823929FE305491351E2B5A2B2A63BBC'
      )
    );
  });
});
