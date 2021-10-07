import assert from 'assert';
import path from 'path';
import { DayOneData } from '../../domain/DayOneEntry';
import { read } from '../jsonRepository';

describe('jsonRepository', () => {
  it('read', async () => {
    const dayOneData = await read<DayOneData>(
      path.resolve(__dirname, '210320_dayone.json')
    );
    assert.ok(
      dayOneData.entries.find(
        (entry) => entry.uuid === '8823929FE305491351E2B5A2B2A63BBC'
      )
    );
  });
});
