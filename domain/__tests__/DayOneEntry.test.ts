import { equal } from 'node:assert/strict';
import { describe, it } from 'node:test';
import { unescape } from '../DayOneEntry';

describe('DayOneEntry', () => {
  it('unescape', () => {
    equal(unescape('J\\. デリダ'), 'J. デリダ'); // TODO: あとでパスさせる
    equal(unescape('一行目\\n二行目'), '一行目\n二行目');
    equal(unescape('一行目\n二行目'), '一行目\n二行目');
    equal(unescape('​*構成*​'), '*構成*'); // ゼロ幅スペースを削除
    equal(unescape('https://sample\\.com'), 'https://sample.com');
  });
});
