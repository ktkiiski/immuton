import extend from '../extend';

describe('extend()', () => {
  it('sets all properties to another values', () => {
    expect(extend({ foo: 'foo', bar: 'bar' }, { bar: 'BAR', foobar: 'FOOBAR' })).toEqual({
      foo: 'foo',
      bar: 'BAR',
      foobar: 'FOOBAR',
    });
  });
  it('returns another obj instance with transformed values', () => {
    const obj1 = { foo: 'foo', bar: 'bar' };
    const obj2 = { bar: 'BAR', foobar: 'FOOBAR' };
    expect(extend(obj1, obj2)).not.toBe(obj1);
    expect(extend(obj1, obj2)).not.toBe(obj2);
  });
  it('does not mutate the original objects', () => {
    const obj1 = { foo: 'foo', bar: 'bar' };
    const obj2 = { bar: 'BAR', foobar: 'FOOBAR' };
    extend(obj1, obj2);
    expect(obj1).toEqual({ foo: 'foo', bar: 'bar' });
    expect(obj2).toEqual({ bar: 'BAR', foobar: 'FOOBAR' });
  });
  it('returns the first obj instance if no changes were applied', () => {
    const obj = { foo: 'foo', bar: 'bar', foobar: 'foobar' };
    expect(extend(obj, { foo: 'foo', foobar: 'foobar' })).toBe(obj);
  });
  it('returns the first obj instance if changes are empty', () => {
    const obj = { foo: 'foo', bar: 'bar', foobar: 'foobar' };
    expect(extend(obj, {})).toBe(obj);
  });
  it('returns the second obj instance if all properties are overridden', () => {
    const obj1 = { foo: 'foo', bar: 'bar' };
    const obj2 = { foo: 'foo', bar: 'bar', foobar: 'foobar' };
    expect(extend(obj1, obj2)).toBe(obj2);
  });
});
