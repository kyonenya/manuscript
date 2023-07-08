import assert from 'assert';
import { subMinutes } from 'date-fns';
import { newEntry } from '../../domain/Entry';
import * as entryRepository from '../entryRepository';
import { entriesQueue } from '../queue';

const entries = [
  newEntry({
    text: 'これは最新の記事です。',
    createdAt: new Date().toISOString(),
  }),
  newEntry({
    text: 'これは一つ前の記事です。',
    createdAt: subMinutes(new Date(), 1).toISOString(),
  }),
  newEntry({
    text: 'これは二つ前の記事です。',
    createdAt: subMinutes(new Date(), 2).toISOString(),
  }),
  newEntry({
    text: 'これは三つ前の記事です。',
    createdAt: subMinutes(new Date(), 3).toISOString(),
  }),
];

describe('entriesQueue', () => {
  beforeEach(async () => {
    await entryRepository.deleteAll();
  });

  it('createMany:queued', async () => {
    const rowCounts = await entriesQueue({
      func: entryRepository.createMany,
      entries,
      each: 2,
      concurrency: Infinity,
    });
    assert.deepStrictEqual(rowCounts, [
      [2, 0],
      [2, 0],
    ]);
  });

  it('createMany:not queued', async () => {
    // to compare exection time: queue should be slower(delayed)
    const rowCounts = await entryRepository.createMany({ entries });
    assert.deepStrictEqual(rowCounts, [4, 0]);
  });

  afterEach(async () => {
    await entryRepository.deleteAll();
  });
});
