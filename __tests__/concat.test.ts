import concat from '../concat';

describe('concat()', () => {
  it('concatenates the given arrays', () => {
    expect(concat([1], [2, 3], [4], [], [5])).toEqual(
      [1, 2, 3, 4, 5],
    );
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
  it('returns the original array if empty', () => {
    const array: number[] = [];
    expect(concat(array)).toBe(array);
  });
  it('returns empty array if no parameters', () => {
    expect(concat()).toEqual([]);
  });
});
