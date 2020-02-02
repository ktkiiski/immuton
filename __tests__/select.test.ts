import select from '../select';
import propertyless from '../propertyless';

describe('select()', () => {
  it('filters each property in the object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(select(obj, (key, value) => value % 2 > 0)).toStrictEqual({ a: 1, c: 3 });
  });
  it('returns another object instance with transformed values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(select(obj, (key, value) => value % 2 > 0)).not.toBe(obj);
  });
  it('does not mutate the original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    select(obj, (key, value) => value % 2 > 0);
    expect(obj).toStrictEqual({ a: 1, b: 2, c: 3 });
  });
  it('returns the original object instance if all properties are picked', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(select(obj, () => true)).toBe(obj);
  });
  it('returns the empty object singleton if all properties are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(select(obj, () => false)).toBe(propertyless);
  });
  it('returns the original object if empty', () => {
    const obj = {};
    expect(select(obj, () => true)).toBe(obj);
  });
  it('exclude omitted value types', () => {
    function isStringValue(key: string, value: string | number): value is string {
      return typeof value === 'string';
    }
    const obj = {
      a: 1,
      b: '2',
      c: 3,
      d: '4',
    };
    const result: { b: string, d: string } = select(obj, isStringValue);
    expect(result).toStrictEqual({ b: '2', d: '4' });
  });
  it('exclude omitted key types', () => {
    function isFoobarKey(key: 'foo' | 'bar' | 'foobar'): key is 'foobar' {
      return key === 'foobar';
    }
    const obj = {
      foo: 1,
      bar: 2,
      foobar: 3,
    };
    const result: { foobar: number } = select(obj, isFoobarKey);
    expect(result).toStrictEqual({ foobar: 3 });
  });
});
