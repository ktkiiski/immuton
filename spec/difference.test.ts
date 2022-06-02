import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import difference from '../src/difference.js';
import empty from '../src/empty.js';

describe('difference()', () => {
  it('returns array without items from the second array', () => {
    deepStrictEqual(difference([1, 2, 3, 4], [1, 3]), [2, 4]);
  });
  it('returns array without equal complex items from the second array', () => {
    deepStrictEqual(difference([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }], [{ a: 'A' }, { c: 'C' }]), [
      { b: 'B' },
      { d: 'D' },
    ]);
  });
  it('preserves duplicates from the original array', () => {
    deepStrictEqual(difference([1, 1, 2, 3, 2, 3, 4, 4, 2], [1, 3]), [2, 2, 4, 4, 2]);
  });
  it('returns another array instance with filtered values', () => {
    const array = [1, 2, 3, 4];
    notStrictEqual(difference(array, [1, 3]), array);
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3, 4];
    difference(array, [1, 3]);
    deepStrictEqual(array, [1, 2, 3, 4]);
  });
  it('returns the original array instance if no items are removed', () => {
    const array = [1, 2, 3, 4];
    const result = difference(array, [0, 5]);
    strictEqual(result, array);
    deepStrictEqual(result, [1, 2, 3, 4]);
  });
  it('returns the original array if empty', () => {
    const array: number[] = [];
    strictEqual(difference(array, [1, 3]), array);
  });
  it('returns the empty singleton array if filtered out everything', () => {
    strictEqual(difference([1, 2], [1, 2]), empty);
    strictEqual(difference([1, 2], [1, 2, 3]), empty);
  });
  it('returns correctly typed array when using type-guarded function', () => {
    const array: Array<0 | 1 | 2 | 3 | 4> = [0, 1, 2, 3, 4];
    const removed: Array<0 | 1> = [0, 1];
    const result: Array<2 | 3 | 4> = difference(array, removed);
    deepStrictEqual(result, [2, 3, 4]);
  });
});
