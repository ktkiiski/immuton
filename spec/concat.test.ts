import { deepStrictEqual, strictEqual } from 'assert';
import concat from '../src/concat.js';
import empty from '../src/empty.js';

describe('concat()', () => {
  it('concatenates the given arrays', () => {
    deepStrictEqual(concat([1], [2, 3], [4], [], [5]), [1, 2, 3, 4, 5]);
  });
  it('does not mutate the original arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5];
    concat(arr1, arr2);
    deepStrictEqual(arr1, [1, 2, 3]);
    deepStrictEqual(arr2, [4, 5]);
  });
  it('returns the reference to the only non-empty array', () => {
    const nested = [1, 2];
    strictEqual(concat(nested), nested);
    strictEqual(concat([], [], nested, [], []), nested);
  });
  it('returns the reference to the only empty array', () => {
    const array: number[] = [];
    strictEqual(concat(array), array);
  });
  it('returns the reference to the first empty array', () => {
    const array: number[] = [];
    strictEqual(concat(array, [], []), array);
  });
  it('returns the empty array singleton if no parameters', () => {
    deepStrictEqual(concat(), empty);
  });
});
