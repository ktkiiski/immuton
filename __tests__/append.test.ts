import append from '../append';

describe('append()', () => {
  it('insert the items into the array', () => {
    expect(append([1, 2, 3], 4)).toEqual([1, 2, 3, 4]);
    expect(append([1, 2, 3], 4, 5)).toEqual([1, 2, 3, 4, 5]);
  });
  it('returns a copy of the array when changed', () => {
    const array = [1, 2, 3];
    expect(append([1, 2, 3], 4, 5)).not.toBe(array);
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3];
    append(array, 4, 5);
    expect(array).toEqual([1, 2, 3]);
  });
  it('returns the original array instance if no changes were applied', () => {
    const array = [1, 2, 3];
    expect(append(array)).toBe(array);
  });
  it('returns the original array if empty and not adding anything', () => {
    const array: number[] = [];
    expect(append(array)).toBe(array);
  });
});
