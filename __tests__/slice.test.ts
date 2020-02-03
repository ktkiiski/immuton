import slice from '../slice';
import empty from '../empty';

describe('slice()', () => {
  it('slices the array', () => {
    expect(slice([1, 2, 3, 4, 5], 0, 4)).toEqual([1, 2, 3, 4]);
    expect(slice([1, 2, 3, 4, 5], 0, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(slice([1, 2, 3, 4, 5], 0, 6)).toEqual([1, 2, 3, 4, 5]);
    expect(slice([1, 2, 3, 4, 5], 1, 4)).toEqual([2, 3, 4]);
    expect(slice([1, 2, 3, 4, 5], 1, 5)).toEqual([2, 3, 4, 5]);
    expect(slice([1, 2, 3, 4, 5], 1, 6)).toEqual([2, 3, 4, 5]);
    expect(slice([1, 2, 3, 4, 5], 3, 3)).toEqual([]);
    expect(slice([1, 2, 3, 4, 5], 3, 2)).toEqual([]);
    expect(slice([1, 2, 3, 4, 5], -2)).toEqual([4, 5]);
    expect(slice([1, 2, 3, 4, 5], -3, -1)).toEqual([3, 4]);
  });
  it('returns a copy of the array when changed', () => {
    const array = [1, 2, 3, 4, 5];
    expect(slice([1, 2, 3, 4, 5], 1, 4)).not.toBe(array);
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3, 4, 5];
    slice([1, 2, 3, 4, 5], 1, 4);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });
  it('returns the original array instance if no changes were applied', () => {
    const array = [1, 2, 3, 4, 5];
    expect(slice(array, 0)).toBe(array);
    expect(slice(array, 0, 5)).toBe(array);
    expect(slice(array, -5, 5)).toBe(array);
    expect(slice(array, -6, 6)).toBe(array);
  });
  it('returns the original array if empty', () => {
    const array: number[] = [];
    expect(slice(array, 0)).toBe(array);
    expect(slice(array, 0, 0)).toBe(array);
    expect(slice(array, -1, 0)).toBe(array);
    expect(slice(array, -1, 1)).toBe(array);
  });
  it('returns the empty singleton array if sliced to empty array', () => {
    const array = [1, 2, 3, 4, 5];
    expect(slice(array, 0, 0)).toBe(empty);
    expect(slice(array, 2, -3)).toBe(empty);
    expect(slice(array, 3, 2)).toBe(empty);
    expect(slice(array, 7, -1)).toBe(empty);
  });
});
