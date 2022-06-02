import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import empty from '../src/empty.js';
import flatten from '../src/flatten.js';

describe('flatten()', () => {
  it('flattens the given array', () => {
    deepStrictEqual(flatten([[1], [2, 3], [4], [], [5]]), [1, 2, 3, 4, 5]);
  });
  it('returns another array instance with transformed values', () => {
    const array = [[1], [2, 3], [4], [], [5]];
    notStrictEqual(flatten(array), array);
  });
  it('does not mutate the original array', () => {
    const array = [[1], [2, 3], [4], [], [5]];
    flatten(array);
    deepStrictEqual(array, [[1], [2, 3], [4], [], [5]]);
  });
  it('returns the reference to the only non-empty array', () => {
    const nested = [1, 2];
    strictEqual(flatten([nested]), nested);
    strictEqual(flatten([[], nested, [], [], []]), nested);
  });
  it('returns the original array if empty', () => {
    const array: number[][] = [];
    strictEqual(flatten(array), array);
  });
  it('returns the empty singleton array if all nested arrays are empty', () => {
    strictEqual(flatten([[], [], []]), empty);
  });
});
