import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import empty from '../src/empty.js';
import mapFilter from '../src/mapFilter.js';

describe('mapFilter()', () => {
  it('transforms each value in the array', () => {
    deepStrictEqual(
      mapFilter([1, 2, 3], (value) => value * 2),
      [2, 4, 6],
    );
  });
  it('filters out values that transform to undefined', () => {
    deepStrictEqual(
      mapFilter([1, 2, 3, 4, 5], (v) => (v % 2 ? v * 2 : undefined)),
      [2, 6, 10],
    );
  });
  it('does not filter out values null transform values', () => {
    deepStrictEqual(
      mapFilter([1, 2, 3], (v) => (v % 2 ? v * 2 : null)),
      [2, null, 6],
    );
  });
  it('returns another array instance with transformed values', () => {
    const array = [1, 2, 3];
    notStrictEqual(
      mapFilter(array, (value) => value * 2),
      array,
    );
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3];
    mapFilter(array, (value) => value * 2);
    deepStrictEqual(array, [1, 2, 3]);
  });
  it('returns the original array instance if no changes were applied', () => {
    const array = [1, 2, 3];
    strictEqual(
      mapFilter(array, (value) => value * 1),
      array,
    );
  });
  it('returns the original array instance if resulting in equal dates', () => {
    const array = [new Date(1), new Date(2), new Date(3)];
    strictEqual(
      mapFilter(array, (d) => new Date(d.getTime())),
      array,
    );
  });
  it('returns the original array if empty', () => {
    const array: number[] = [];
    strictEqual(
      mapFilter(array, (value) => value * 2),
      array,
    );
  });
  it('returns the empty singleton if filtered out everything', () => {
    strictEqual(
      mapFilter([1, 2, 3], () => undefined),
      empty,
    );
  });
});
