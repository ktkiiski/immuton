import differenceBy from '../differenceBy';
import empty from '../empty';

describe('differenceBy()', () => {
  it('returns array without items from the second array', () => {
    expect(differenceBy([{ x: 'A' }, { x: 'B' }, { x: 'C' }, { x: 'D' }], [{ x: 'A' }, { x: 'C' }], (item) => item.x)).toStrictEqual([{ x: 'B' }, { x: 'D' }]);
  });
  it('returns array without equal complex items from the second array', () => {
    expect(differenceBy(
      [{ x: { a: 'A' } }, { x: { b: 'B' } }, { x: { c: 'C' } }, { x: { d: 'D' } }],
      [{ x: { a: 'A' } }, { x: { c: 'C' } }],
      (item) => item.x,
    )).toStrictEqual(
      [{ x: { b: 'B' } }, { x: { d: 'D' } }],
    );
  });
  it('preserves duplicates from the original array', () => {
    expect(differenceBy(
      [{ x: 1 }, { x: 1 }, { x: 2 }, { x: 3 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 4 }, { x: 2 }],
      [{ x: 1 }, { x: 3 }],
      (item) => item.x,
    )).toStrictEqual(
      [{ x: 2 }, { x: 2 }, { x: 4 }, { x: 4 }, { x: 2 }],
    );
  });
  it('returns another array instance with filtered values', () => {
    const array = [1, 2, 3, 4];
    expect(differenceBy(array, [1, 3], (x) => x)).not.toBe(array);
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3, 4];
    differenceBy(array, [1, 3], (x) => x);
    expect(array).toStrictEqual([1, 2, 3, 4]);
  });
  it('returns the original array instance if no items are removed', () => {
    const array = [1, 2, 3, 4];
    const result = differenceBy(array, [0, 5], (x) => x);
    expect(result).toBe(array);
    expect(result).toStrictEqual([1, 2, 3, 4]);
  });
  it('returns the original array if empty', () => {
    const array: number[] = [];
    expect(differenceBy(array, [1, 3], (x) => x)).toBe(array);
  });
  it('returns the empty singleton array if filtered out everything', () => {
    expect(differenceBy([1, 2], [1, 2], (x) => x)).toBe(empty);
    expect(differenceBy([1, 2], [1, 2, 3], (x) => x)).toBe(empty);
  });
});
