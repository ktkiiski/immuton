import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import empty from '../src/empty.js';
import filter from '../src/filter.js';

describe('filter()', () => {
  it('returns array of matching items', () => {
    deepStrictEqual(
      filter([1, 2, 3, 4], (value) => value % 2 === 0),
      [2, 4],
    );
  });
  it('returns another array instance with filtered values', () => {
    const array = [1, 2, 3, 4];
    notStrictEqual(
      filter(array, (value) => value % 2 === 0),
      array,
    );
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3, 4];
    filter(array, (value) => value % 2 === 0);
    deepStrictEqual(array, [1, 2, 3, 4]);
  });
  it('returns the original array instance if all the items match', () => {
    const array = [1, 2, 3, 4];
    const result = filter(array, (value) => value > 0);
    strictEqual(result, array);
    deepStrictEqual(result, [1, 2, 3, 4]);
  });
  it('returns the original array if empty', () => {
    const array: number[] = [];
    strictEqual(
      filter(array, (value) => value % 2 === 0),
      array,
    );
  });
  it('returns the empty singleton array if filtered out everything', () => {
    strictEqual(
      filter([1, 2], () => false),
      empty,
    );
  });
  it('returns correctly typed array when using type-guarded function', () => {
    const array: Array<number | boolean> = [1, true, false, 3];
    function isBoolean(value: boolean | number): value is boolean {
      return typeof value === 'boolean';
    }
    const result: Array<boolean> = filter(array, isBoolean);
    deepStrictEqual(result, [true, false]);
  });
});
