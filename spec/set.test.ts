import set from '../src/set.js';

describe('set()', () => {
  it('sets property to another value', () => {
    expect(set({ foo: 'foo', bar: 'bar' }, 'foo', 'FOO')).toEqual({ foo: 'FOO', bar: 'bar' });
  });
  it('returns another obj instance with transformed values', () => {
    const obj = { foo: 'foo', bar: 'bar' };
    expect(set(obj, 'foo', 'FOO')).not.toBe(obj);
  });
  it('does not mutate the original obj', () => {
    const obj = { foo: 'foo', bar: 'bar' };
    set(obj, 'foo', 'FOO');
    expect(obj).toEqual({ foo: 'foo', bar: 'bar' });
  });
  it('returns the original obj instance if no changes were applied', () => {
    const obj = { foo: 'foo', bar: 'bar' };
    expect(set(obj, 'foo', 'foo')).toBe(obj);
  });
});
