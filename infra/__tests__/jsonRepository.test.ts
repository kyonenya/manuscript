import assert from 'assert';
import path from 'path';
import { readAll, unescape } from '../jsonRepository';

describe('jsonRepository', () => {
  it('unescape', () => {
    assert.strictEqual(unescape('J\\. デリダ'), 'J. デリダ');
    assert.strictEqual(unescape('一行目\\n二行目'), '一行目\n二行目');
    assert.strictEqual(unescape('一行目\n二行目'), '一行目\n二行目');
    assert.strictEqual(unescape('​*構成*​'), '*構成*'); // ゼロ幅スペース
    assert.strictEqual(unescape('https://sample\\.com'), 'https://sample.com');
  });

  it('readAll', async () => {
    const entries = await readAll(
      path.resolve(__dirname, '210320_dayone.json')
    );
    assert.ok(
      entries.find((entry) => entry.uuid === '8823929FE305491351E2B5A2B2A63BBC')
    );
  });
});
