import assert from 'assert';
import { toSearchedSummary } from '../Entry';

describe('toSearchedSummary', () => {
  const text =
    '日本国民は、正当に選挙された国会における代表者を通じて行動し、われらとわれらの子孫のために、諸国民との協和による成果と、わが国全土にわたつて自由のもたらす恵沢を確保し、政府の行為によつて再び戦争の惨禍が起ることのないやうにすることを決意し、ここに主権が国民に存することを宣言し、この憲法を確定する。';
  it('in the middle', () => {
    const keyword = '恵沢';
    const summary = toSearchedSummary({ text, keyword });
    assert.strictEqual(summary.keyword, keyword);
    assert.strictEqual(summary.isBeforeEllipsed, true);
    assert.strictEqual(summary.isAfterEllipsed, true);
  });
  it('near the end', () => {
    const keyword = '確定する';
    const summary = toSearchedSummary({ text, keyword });
    assert.strictEqual(summary.keyword, keyword);
    assert.strictEqual(summary.isBeforeEllipsed, true);
    assert.strictEqual(summary.isAfterEllipsed, false);
  });
  it('near the top', () => {
    const keyword = '正当に選挙';
    const summary = toSearchedSummary({ text, keyword });
    assert.strictEqual(summary.keyword, keyword);
    assert.strictEqual(summary.isBeforeEllipsed, false);
    assert.strictEqual(summary.isAfterEllipsed, true);
  });
});
