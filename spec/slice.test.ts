import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import empty from '../src/empty.js';
import slice from '../src/slice.js';

describe('slice()', () => {
  it('slices the array', () => {
    deepStrictEqual(slice([1, 2, 3, 4, 5], 0, 4), [1, 2, 3, 4]);
    deepStrictEqual(slice([1, 2, 3, 4, 5], 0, 5), [1, 2, 3, 4, 5]);
    deepStrictEqual(slice([1, 2, 3, 4, 5], 0, 6), [1, 2, 3, 4, 5]);
    deepStrictEqual(slice([1, 2, 3, 4, 5], 1, 4), [2, 3, 4]);
    deepStrictEqual(slice([1, 2, 3, 4, 5], 1, 5), [2, 3, 4, 5]);
    deepStrictEqual(slice([1, 2, 3, 4, 5], 1, 6), [2, 3, 4, 5]);
    deepStrictEqual(slice([1, 2, 3, 4, 5], 3, 3), []);
    deepStrictEqual(slice([1, 2, 3, 4, 5], 3, 2), []);
    deepStrictEqual(slice([1, 2, 3, 4, 5], -2), [4, 5]);
    deepStrictEqual(slice([1, 2, 3, 4, 5], -3, -1), [3, 4]);
  });
  it('returns a copy of the array when changed', () => {
    const array = [1, 2, 3, 4, 5];
    notStrictEqual(slice([1, 2, 3, 4, 5], 1, 4), array);
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3, 4, 5];
    slice([1, 2, 3, 4, 5], 1, 4);
    deepStrictEqual(array, [1, 2, 3, 4, 5]);
  });
  it('returns the original array instance if no changes were applied', () => {
    const array = [1, 2, 3, 4, 5];
    strictEqual(slice(array, 0), array);
    strictEqual(slice(array, 0, 5), array);
    strictEqual(slice(array, -5, 5), array);
    strictEqual(slice(array, -6, 6), array);
  });
  it('returns the original array if empty', () => {
    const array: number[] = [];
    strictEqual(slice(array, 0), array);
    strictEqual(slice(array, 0, 0), array);
    strictEqual(slice(array, -1, 0), array);
    strictEqual(slice(array, -1, 1), array);
  });
  it('returns the empty singleton array if sliced to empty array', () => {
    const array = [1, 2, 3, 4, 5];
    strictEqual(slice(array, 0, 0), empty);
    strictEqual(slice(array, 2, -3), empty);
    strictEqual(slice(array, 3, 2), empty);
    strictEqual(slice(array, 7, -1), empty);
  });
});
