import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import empty from '../src/empty.js';
import flatMap from '../src/flatMap.js';

describe('flatMap()', () => {
  it('transforms each value in the array', () => {
    deepStrictEqual(
      flatMap([1, 2, 3], (value) => [value, value * 2]),
      [1, 2, 2, 4, 3, 6],
    );
    deepStrictEqual(
      flatMap([1, 2, 3], (value) => (value % 2 ? [value] : [])),
      [1, 3],
    );
  });
  it('returns another array instance with transformed values', () => {
    const array = [1, 2, 3];
    notStrictEqual(
      flatMap([1, 2, 3], (value) => [value, value * 2]),
      array,
    );
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3];
    flatMap([1, 2, 3], (value) => [value, value * 2]);
    deepStrictEqual(array, [1, 2, 3]);
  });
  it('returns the original array instance if no changes were applied', () => {
    const array = [1, 2, 3];
    strictEqual(
      flatMap(array, (value) => [value]),
      array,
    );
  });
  it('returns the original array instance if empty', () => {
    const array: number[] = [];
    strictEqual(
      flatMap(array, (value) => [value]),
      array,
    );
  });
  it('returns the empty singleton array if filtering everything out', () => {
    const array = [1, 2, 3];
    strictEqual(
      flatMap(array, () => []),
      empty,
    );
  });
});
