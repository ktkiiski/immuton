import map from '../src/map.js';

describe('map()', () => {
  it('transforms each value in the array', () => {
    expect(map([1, 2, 3], (value) => value * 2)).toEqual([2, 4, 6]);
  });
  it('returns another array instance with transformed values', () => {
    const array = [1, 2, 3];
    expect(map(array, (value) => value * 2)).not.toBe(array);
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3];
    map(array, (value) => value * 2);
    expect(array).toEqual([1, 2, 3]);
  });
  it('returns the original array instance if no changes were applied', () => {
    const array = [1, 2, 3];
    expect(map(array, (value) => value * 1)).toBe(array);
  });
  it('returns the original array instance if resulting in equal dates', () => {
    const array = [new Date(1), new Date(2), new Date(3)];
    expect(map(array, (d) => new Date(d.getTime()))).toBe(array);
  });
  it('returns the original array if empty', () => {
    const array: number[] = [];
    expect(map(array, (value) => value * 2)).toBe(array);
  });
});
