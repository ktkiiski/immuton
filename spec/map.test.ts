import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import map from '../src/map.js';

describe('map()', () => {
  it('transforms each value in the array', () => {
    deepStrictEqual(
      map([1, 2, 3], (value) => value * 2),
      [2, 4, 6],
    );
  });
  it('returns another array instance with transformed values', () => {
    const array = [1, 2, 3];
    notStrictEqual(
      map(array, (value) => value * 2),
      array,
    );
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3];
    map(array, (value) => value * 2);
    deepStrictEqual(array, [1, 2, 3]);
  });
  it('returns the original array instance if no changes were applied', () => {
    const array = [1, 2, 3];
    strictEqual(
      map(array, (value) => value * 1),
      array,
    );
  });
  it('returns the original array instance if resulting in equal dates', () => {
    const array = [new Date(1), new Date(2), new Date(3)];
    strictEqual(
      map(array, (d) => new Date(d.getTime())),
      array,
    );
  });
  it('returns the original array if empty', () => {
    const array: number[] = [];
    strictEqual(
      map(array, (value) => value * 2),
      array,
    );
  });
});
