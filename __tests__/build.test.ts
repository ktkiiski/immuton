import build from '../build';
import propertyless from '../propertyless';

describe('build()', () => {
  it('builds the object from the key-value pairs', () => {
    expect(build(['a', 'b', 'c'], (value) => [value, value.toUpperCase()])).toEqual({
      a: 'A',
      b: 'B',
      c: 'C',
    });
  });
  it('omits entries that return undefined', () => {
    expect(build([1, 2, 3, 4], (value) => (value % 2 ? [`${value}`, value] : null))).toEqual({ 1: 1, 3: 3 });
  });
  it('does not mutate the original array', () => {
    const array = ['a', 'b', 'c'];
    build(['a', 'b', 'c'], (value) => [value, value.toUpperCase()]);
    expect(array).toEqual(['a', 'b', 'c']);
  });
  it('returns empty object singleton if result is empty', () => {
    expect(build([], (value) => [value, value])).toBe(propertyless);
  });
});
