import splice from '../splice';
import empty from '../empty';

describe('splice()', () => {
  it('deletes items from the array', () => {
    expect(splice([1, 2, 3, 4, 5], 1, 2)).toEqual([1, 4, 5]);
  });
  it('inserts items into the array', () => {
    expect(splice([1, 2, 5], 2, 0, 3, 4)).toEqual([1, 2, 3, 4, 5]);
  });
  it('deletes and inserts from/into the array', () => {
    expect(splice([1, 1, 5], 1, 1, 2, 3, 4)).toEqual([1, 2, 3, 4, 5]);
  });
  it('returns a copy of the array when changed', () => {
    const array = [1, 2, 3];
    expect(splice([1, 2, 3, 4, 5], 1, 2)).not.toBe(array);
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3];
    splice(array, 1, 1, 4, 5);
    expect(array).toEqual([1, 2, 3]);
  });
  it('returns the original array instance if no changes were applied', () => {
    const array = [1, 2, 3];
    expect(splice(array, 1, 0)).toBe(array);
  });
  it('returns the original array if empty and not adding anything', () => {
    const array: number[] = [];
    expect(splice(array, 1, 1)).toBe(array);
  });
  it('returns the empty singleton array if removed everything', () => {
    expect(splice([1, 2, 3], 0, 3)).toBe(empty);
  });
});
