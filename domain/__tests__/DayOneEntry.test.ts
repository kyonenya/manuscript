import assert from 'node:assert';

describe('DayOneEntry', () => {
  it('unescape', () => {
    assert.strictEqual(unescape('J\\. デリダ'), 'J. デリダ');
    assert.strictEqual(unescape('一行目\\n二行目'), '一行目\n二行目');
    assert.strictEqual(unescape('一行目\n二行目'), '一行目\n二行目');
    assert.strictEqual(unescape('​*構成*​'), '*構成*'); // ゼロ幅スペースを削除
    assert.strictEqual(unescape('https://sample\\.com'), 'https://sample.com');
  });
});
