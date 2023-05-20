import assert from 'assert';
import dayjs from '../../infra/dayjs';
import { unescape, fromEntry } from '../DayOneEntry';
import { newEntry } from '../Entry';

describe('DayOneEntry', () => {
  it('unescape', () => {
    assert.strictEqual(unescape('J\\. デリダ'), 'J. デリダ');
    assert.strictEqual(unescape('一行目\\n二行目'), '一行目\n二行目');
    assert.strictEqual(unescape('一行目\n二行目'), '一行目\n二行目');
    assert.strictEqual(unescape('​*構成*​'), '*構成*'); // ゼロ幅スペースを削除
    assert.strictEqual(unescape('https://sample\\.com'), 'https://sample.com');
  });

  it('fromEntry', () => {
    const entry = newEntry({
      text: 'これはサンプルの記事です。',
      createdAt: dayjs.tz('2020-04-01 00:00'), // Local
    });
    const dayOneEntry = fromEntry(entry);
    assert.strictEqual(dayOneEntry.creationDate, '2020-03-31T15:00:00Z'); // UTC
  });
});
