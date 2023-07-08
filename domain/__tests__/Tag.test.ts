import { equal, deepEqual } from 'node:assert/strict';
import { describe, it } from 'node:test';
import { subMinutes } from 'date-fns';
import { newEntry } from '../Entry';
import { tagNameToId, entriesTagToABs } from '../Tag';

describe('Tag', () => {
  it('tagNameToId', () => {
    const tags = [
      { id: 1, name: 'タグ1' },
      { id: 2, name: 'タグ2' },
      { id: 3, name: 'タグ3' },
    ];
    const name = 'タグ2';
    equal(tagNameToId({ name, tags }), 2);
  });

  it('entriesTagToABs', () => {
    const entries = [
      newEntry({
        text: 'これは最新の記事です。',
        createdAt: new Date().toISOString(),
        tags: ['タグ1'],
      }),
      newEntry({
        text: 'これは一つ前の記事です。',
        tags: ['タグ1', 'タグ2'],
        createdAt: subMinutes(new Date(), 1).toISOString(),
      }),
    ];
    const tags = [
      { id: 1, name: 'タグ1' },
      { id: 2, name: 'タグ2' },
      { id: 3, name: 'タグ3' },
    ];
    deepEqual(entriesTagToABs({ entries, tags }), [
      [entries[0].uuid, 1],
      [entries[1].uuid, 1],
      [entries[1].uuid, 2],
    ]);
  });
});
