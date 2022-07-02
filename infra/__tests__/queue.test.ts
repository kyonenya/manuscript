import assert from 'assert';
import dayjs from 'dayjs';
import { newEntry } from '../../domain/Entry';
import * as entryRepository from '../entryRepository';
import { begin, rollback } from '../postgres';
import { entriesQueue } from '../queue';

const entries = [
  newEntry({
    text: 'これは最新の記事です。',
    createdAt: dayjs(),
  }),
  newEntry({
    text: 'これは一つ前の記事です。',
    createdAt: dayjs().subtract(1, 'm'),
  }),
  newEntry({
    text: 'これは二つ前の記事です。',
    createdAt: dayjs().subtract(2, 'm'),
  }),
  newEntry({
    text: 'これは三つ前の記事です。',
    createdAt: dayjs().subtract(3, 'm'),
  }),
];

describe('entriesQueue', () => {
  beforeEach(() => begin());

  it('createMany:queued', async () => {
    const rowCounts = await entriesQueue({
      func: entryRepository.createMany,
      entries,
      each: 2,
      concurrency: Infinity,
    });
    assert.deepStrictEqual(rowCounts, [[2], [2]]);
  });

  it('createMany:not queued', async () => {
    // to compare exection time: queue should be slower(delayed)
    const rowCounts = await entryRepository.createMany({ entries });
    assert.deepStrictEqual(rowCounts, [4]);
  });

  afterEach(() => rollback());
});
