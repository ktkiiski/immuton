import empty from '../empty';
import mapFilter from '../mapFilter';

describe('mapFilter()', () => {
  it('transforms each value in the array', () => {
    expect(mapFilter([1, 2, 3], (value) => value * 2)).toEqual([2, 4, 6]);
  });
  it('filters out values that transform to undefined', () => {
    expect(mapFilter([1, 2, 3, 4, 5], (v) => (v % 2 ? v * 2 : undefined))).toEqual([2, 6, 10]);
  });
  it('does not filter out values null transform values', () => {
    expect(mapFilter([1, 2, 3], (v) => (v % 2 ? v * 2 : null))).toEqual([2, null, 6]);
  });
  it('returns another array instance with transformed values', () => {
    const array = [1, 2, 3];
    expect(mapFilter(array, (value) => value * 2)).not.toBe(array);
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3];
    mapFilter(array, (value) => value * 2);
    expect(array).toEqual([1, 2, 3]);
  });
  it('returns the original array instance if no changes were applied', () => {
    const array = [1, 2, 3];
    expect(mapFilter(array, (value) => value * 1)).toBe(array);
  });
  it('returns the original array instance if resulting in equal dates', () => {
    const array = [new Date(1), new Date(2), new Date(3)];
    expect(mapFilter(array, (d) => new Date(d.getTime()))).toBe(array);
  });
  it('returns the original array if empty', () => {
    const array: number[] = [];
    expect(mapFilter(array, (value) => value * 2)).toBe(array);
  });
  it('returns the empty singleton if filtered out everything', () => {
    expect(mapFilter([1, 2, 3], () => undefined)).toBe(empty);
  });
});
