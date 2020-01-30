import transform from '../transform';

describe('transform()', () => {
  it('transforms each value in the object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(transform(obj, (value, key) => key + value)).toEqual({
      a: 'a1', b: 'b2', c: 'c3',
    });
  });
  it('returns another object instance with transformed values', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(transform(obj, (value, key) => key + value)).not.toBe(obj);
  });
  it('does not mutate the original object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    transform(obj, (value, key) => key + value);
    expect(obj).toEqual({ a: '1', b: '2', c: '3' });
  });
  it('returns the original object instance if no changes were applied', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(transform(obj, (value) => value)).toBe(obj);
  });
  it('returns the original object if empty', () => {
    const obj = {};
    expect(transform(obj, (value, key) => key + value)).toBe(obj);
  });
});
