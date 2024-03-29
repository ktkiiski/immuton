import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import differenceBy from '../src/differenceBy.js';
import empty from '../src/empty.js';

describe('differenceBy()', () => {
  it('returns array without items from the second array', () => {
    deepStrictEqual(
      differenceBy([{ x: 'A' }, { x: 'B' }, { x: 'C' }, { x: 'D' }], [{ x: 'A' }, { x: 'C' }], (item) => item.x),
      [{ x: 'B' }, { x: 'D' }],
    );
  });
  it('returns array without equal complex items from the second array', () => {
    deepStrictEqual(
      differenceBy(
        [{ x: { a: 'A' } }, { x: { b: 'B' } }, { x: { c: 'C' } }, { x: { d: 'D' } }],
        [{ x: { a: 'A' } }, { x: { c: 'C' } }],
        (item) => item.x,
      ),
      [{ x: { b: 'B' } }, { x: { d: 'D' } }],
    );
  });
  it('preserves duplicates from the original array', () => {
    deepStrictEqual(
      differenceBy(
        [{ x: 1 }, { x: 1 }, { x: 2 }, { x: 3 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 4 }, { x: 2 }],
        [{ x: 1 }, { x: 3 }],
        (item) => item.x,
      ),
      [{ x: 2 }, { x: 2 }, { x: 4 }, { x: 4 }, { x: 2 }],
    );
  });
  it('returns another array instance with filtered values', () => {
    const array = [1, 2, 3, 4];
    notStrictEqual(
      differenceBy(array, [1, 3], (x) => x),
      array,
    );
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3, 4];
    differenceBy(array, [1, 3], (x) => x);
    deepStrictEqual(array, [1, 2, 3, 4]);
  });
  it('returns the original array instance if no items are removed', () => {
    const array = [1, 2, 3, 4];
    const result = differenceBy(array, [0, 5], (x) => x);
    strictEqual(result, array);
    deepStrictEqual(result, [1, 2, 3, 4]);
  });
  it('returns the original array if empty', () => {
    const array: number[] = [];
    strictEqual(
      differenceBy(array, [1, 3], (x) => x),
      array,
    );
  });
  it('returns the empty singleton array if filtered out everything', () => {
    strictEqual(
      differenceBy([1, 2], [1, 2], (x) => x),
      empty,
    );
    strictEqual(
      differenceBy([1, 2], [1, 2, 3], (x) => x),
      empty,
    );
  });
});
