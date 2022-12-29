import assert from 'assert';
import dayjs from 'dayjs';
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
    assert.strictEqual(tagNameToId({ name, tags }), 2);
  });

  it('entriesTagToABs', () => {
    const entries = [
      newEntry({
        text: 'これは最新の記事です。',
        createdAt: dayjs(),
        tags: ['タグ1'],
      }),
      newEntry({
        text: 'これは一つ前の記事です。',
        tags: ['タグ1', 'タグ2'],
        createdAt: dayjs().subtract(1, 'm'),
      }),
    ];
    const tags = [
      { id: 1, name: 'タグ1' },
      { id: 2, name: 'タグ2' },
      { id: 3, name: 'タグ3' },
    ];
    assert.deepStrictEqual(entriesTagToABs({ entries, tags }), [
      [entries[0].uuid, 1],
      [entries[1].uuid, 1],
      [entries[1].uuid, 2],
    ]);
  });
});
