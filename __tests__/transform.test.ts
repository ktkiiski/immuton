import transform from '../transform';

describe('transform()', () => {
  it('transforms each value in the object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(transform(obj, (key, value) => key + value)).toEqual({
      a: 'a1', b: 'b2', c: 'c3',
    });
  });
  it('returns another object instance with transformed values', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(transform(obj, (key, value) => key + value)).not.toBe(obj);
  });
  it('does not mutate the original object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    transform(obj, (key, value) => key + value);
    expect(obj).toEqual({ a: '1', b: '2', c: '3' });
  });
  it('returns the original object instance if no changes were applied', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(transform(obj, (key, value) => value)).toBe(obj);
  });
  it('returns the original object instance if resulting in equal Date values', () => {
    const obj = { a: new Date(1), b: new Date(2) };
    expect(transform(obj, (key, value) => new Date(value.getTime()))).toBe(obj);
  });
  it('returns the original object if empty', () => {
    const obj = {};
    expect(transform(obj, (key, value) => key + value)).toBe(obj);
  });
});
