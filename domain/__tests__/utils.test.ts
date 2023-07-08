import { deepEqual } from 'node:assert/strict';
import { describe, it } from 'node:test';
import { splitArray } from '../utils';

describe('splitArray', () => {
  it('each 3', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]];
    deepEqual(splitArray(array, 3), result);
  });
});
