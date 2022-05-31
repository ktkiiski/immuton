import concat from '../src/concat.js';
import empty from '../src/empty.js';

describe('concat()', () => {
  it('concatenates the given arrays', () => {
    expect(concat([1], [2, 3], [4], [], [5])).toEqual([1, 2, 3, 4, 5]);
  });
  it('does not mutate the original arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5];
    concat(arr1, arr2);
    expect(arr1).toEqual([1, 2, 3]);
    expect(arr2).toEqual([4, 5]);
  });
  it('returns the reference to the only non-empty array', () => {
    const nested = [1, 2];
    expect(concat(nested)).toBe(nested);
    expect(concat([], [], nested, [], [])).toBe(nested);
  });
  it('returns the reference to the only empty array', () => {
    const array: number[] = [];
    expect(concat(array)).toBe(array);
  });
  it('returns the reference to the first empty array', () => {
    const array: number[] = [];
    expect(concat(array, [], [])).toBe(array);
  });
  it('returns the empty array singleton if no parameters', () => {
    expect(concat()).toEqual(empty);
  });
});
