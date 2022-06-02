import { deepStrictEqual, strictEqual } from 'assert';
import empty from '../src/empty.js';
import mapObject from '../src/mapObject.js';

describe('mapObject()', () => {
  it('transforms each key-value pair in the object', () => {
    const obj = { foo: 'FOO', bar: 'BAR' };
    deepStrictEqual(
      mapObject(obj, (value, key) => [key, value]),
      [
        ['foo', 'FOO'],
        ['bar', 'BAR'],
      ],
    );
  });
  it('does not mutate the original object', () => {
    const obj = { foo: 'FOO', bar: 'BAR' };
    mapObject(obj, (value, key) => [key, value]);
    deepStrictEqual(obj, { foo: 'FOO', bar: 'BAR' });
  });
  it('returns the empty array singleton if object has no properties', () => {
    strictEqual(
      mapObject({}, () => null),
      empty,
    );
  });
});
