import flatMap from '../flatMap';
import empty from '../empty';

describe('flatMap()', () => {
  it('transforms each value in the array', () => {
    expect(flatMap([1, 2, 3], (value) => [value, value * 2])).toEqual([1, 2, 2, 4, 3, 6]);
    expect(flatMap([1, 2, 3], (value) => (value % 2 ? [value] : []))).toEqual([1, 3]);
  });
  it('returns another array instance with transformed values', () => {
    const array = [1, 2, 3];
    expect(flatMap([1, 2, 3], (value) => [value, value * 2])).not.toBe(array);
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3];
    flatMap([1, 2, 3], (value) => [value, value * 2]);
    expect(array).toEqual([1, 2, 3]);
  });
  it('returns the original array instance if no changes were applied', () => {
    const array = [1, 2, 3];
    expect(flatMap(array, (value) => [value])).toBe(array);
  });
  it('returns the original array instance if empty', () => {
    const array: number[] = [];
    expect(flatMap(array, (value) => [value])).toBe(array);
  });
  it('returns the empty singleton array if filtering everything out', () => {
    const array = [1, 2, 3];
    expect(flatMap(array, () => [])).toBe(empty);
  });
});
