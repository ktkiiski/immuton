import { strictEqual, deepStrictEqual } from 'assert';
import build from '../src/build.js';
import propertyless from '../src/propertyless.js';

describe('build()', () => {
  it('builds the object from the key-value pairs', () => {
    deepStrictEqual(
      build(['a', 'b', 'c'], (value) => [value, value.toUpperCase()]),
      {
        a: 'A',
        b: 'B',
        c: 'C',
      },
    );
  });
  it('omits entries that return undefined', () => {
    deepStrictEqual(
      build([1, 2, 3, 4], (value) => (value % 2 ? [`${value}`, value] : null)),
      { 1: 1, 3: 3 },
    );
  });
  it('does not mutate the original array', () => {
    const array = ['a', 'b', 'c'];
    build(['a', 'b', 'c'], (value) => [value, value.toUpperCase()]);
    deepStrictEqual(array, ['a', 'b', 'c']);
  });
  it('returns empty object singleton if result is empty', () => {
    strictEqual(
      build([], (value) => [value, value]),
      propertyless,
    );
  });
});
