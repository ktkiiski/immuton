import flatten from '../flatten';
import empty from '../empty';

describe('flatten()', () => {
  it('flattens the given array', () => {
    expect(flatten([[1], [2, 3], [4], [], [5]])).toEqual(
      [1, 2, 3, 4, 5],
    );
  });
  it('returns another array instance with transformed values', () => {
    const array = [[1], [2, 3], [4], [], [5]];
    expect(flatten(array)).not.toBe(array);
  });
  it('does not mutate the original array', () => {
    const array = [[1], [2, 3], [4], [], [5]];
    flatten(array);
    expect(array).toEqual([[1], [2, 3], [4], [], [5]]);
  });
  it('returns the reference to the only non-empty array', () => {
    const nested = [1, 2];
    expect(flatten([nested])).toBe(nested);
    expect(flatten([[], nested, [], [], []])).toBe(nested);
  });
  it('returns the original array if empty', () => {
    const array: number[][] = [];
    expect(flatten(array)).toBe(array);
  });
  it('returns the empty singleton array if all nested arrays are empty', () => {
    expect(flatten([[], [], []])).toBe(empty);
  });
});
