import reject from '../reject';
import empty from '../empty';

describe('reject()', () => {
  it('returns array of matching items', () => {
    expect(reject([1, 2, 3, 4], (value) => value % 2 !== 0)).toEqual([2, 4]);
  });
  it('returns another array instance with filtered values', () => {
    const array = [1, 2, 3, 4];
    expect(reject(array, (value) => value % 2 !== 0)).not.toBe(array);
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3, 4];
    reject(array, (value) => value % 2 !== 0);
    expect(array).toEqual([1, 2, 3, 4]);
  });
  it('returns the original array instance if all the items match', () => {
    const array = [1, 2, 3, 4];
    const result = reject(array, (value) => value <= 0);
    expect(result).toBe(array);
    expect(result).toEqual([1, 2, 3, 4]);
  });
  it('returns the original array if empty', () => {
    const array: number[] = [];
    expect(reject(array, (value) => value % 2 !== 0)).toBe(array);
  });
  it('returns the empty singleton array if filtered out everything', () => {
    expect(reject([1, 2], () => true)).toBe(empty);
  });
  it('returns correctly typed array when using type-guarded function', () => {
    const array: Array<number | boolean> = [1, true, false, 3];
    function isBoolean(value: boolean | number): value is boolean {
      return typeof value === 'boolean';
    }
    const result: Array<number> = reject(array, isBoolean);
    expect(result).toEqual([1, 3]);
  });
});
