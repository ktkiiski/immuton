import filter from '../filter';
import empty from '../empty';

describe('filter()', () => {
  it('returns array of matching items', () => {
    expect(filter([1, 2, 3, 4], (value) => value % 2 === 0)).toEqual([2, 4]);
  });
  it('returns another array instance with filtered values', () => {
    const array = [1, 2, 3, 4];
    expect(filter(array, (value) => value % 2 === 0)).not.toBe(array);
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3, 4];
    filter(array, (value) => value % 2 === 0);
    expect(array).toEqual([1, 2, 3, 4]);
  });
  it('returns the original array instance if all the items match', () => {
    const array = [1, 2, 3, 4];
    const result = filter(array, (value) => value > 0);
    expect(result).toBe(array);
    expect(result).toEqual([1, 2, 3, 4]);
  });
  it('returns the empty singleton array if empty', () => {
    expect(filter([], (value) => value % 2 === 0)).toBe(empty);
  });
  it('returns the empty singleton array if filtered out everything', () => {
    expect(filter([1, 2], () => false)).toBe(empty);
  });
  it('returns correctly typed array when using type-guarded function', () => {
    const array: Array<number | boolean> = [1, true, false, 3];
    function isBoolean(value: boolean | number): value is boolean {
      return typeof value === 'boolean';
    }
    const result: Array<boolean> = filter(array, isBoolean);
    expect(result).toEqual([true, false]);
  });
});
