import empty from '../empty';
import mapObject from '../mapObject';

describe('mapObject()', () => {
  it('transforms each key-value pair in the object', () => {
    const obj = { foo: 'FOO', bar: 'BAR' };
    expect(mapObject(obj, (value, key) => [key, value])).toEqual([
      ['foo', 'FOO'],
      ['bar', 'BAR'],
    ]);
  });
  it('does not mutate the original object', () => {
    const obj = { foo: 'FOO', bar: 'BAR' };
    mapObject(obj, (value, key) => [key, value]);
    expect(obj).toEqual({ foo: 'FOO', bar: 'BAR' });
  });
  it('returns the empty array singleton if object has no properties', () => {
    expect(mapObject({}, () => null)).toBe(empty);
  });
});
