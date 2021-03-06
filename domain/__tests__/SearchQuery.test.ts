import assert from 'assert';
import { newSearchQuery } from '../SearchQuery';

describe('SearchQuery', () => {
  it('empty', () => {
    const searchStr = '';
    const searchQuery = newSearchQuery(searchStr);
    // keyword is not optional
    assert.strictEqual(searchQuery.keyword, '');
  });
  it('keyword', () => {
    const searchStr = 'キーワード';
    const searchQuery = newSearchQuery(searchStr);
    assert.strictEqual(searchQuery.keyword, 'キーワード');
  });
  it('tag', () => {
    const searchStr = 'tag:タグ ';
    const searchQuery = newSearchQuery(searchStr);
    assert.strictEqual(searchQuery.tag, 'タグ');
    assert.strictEqual(searchQuery.keyword, '');
  });
  it('keyword+tag', () => {
    const searchStr = 'キーワード tag:タグ since:2020-12-01';
    const searchQuery = newSearchQuery(searchStr);
    assert.strictEqual(searchQuery.keyword, 'キーワード');
    assert.strictEqual(searchQuery.tag, 'タグ');
  });
});
