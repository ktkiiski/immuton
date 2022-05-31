import transform from '../src/transform.js';

describe('transform()', () => {
  it('transforms each value in the object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(transform(obj, (value, key) => key + value)).toStrictEqual({
      a: 'a1',
      b: 'b2',
      c: 'c3',
    });
  });
  it('transforms values partially in the object', () => {
    const input = {
      property1: 'value1',
      property2: ['value2', 'value3'],
      property3: 'value4',
      property4: [],
    };
    const output = transform(input, (val) => (Array.isArray(val) ? val : [val]));
    expect(output).toStrictEqual({
      property1: ['value1'],
      property2: ['value2', 'value3'],
      property3: ['value4'],
      property4: [],
    });
  });
  it('returns another object instance with transformed values', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(transform(obj, (value, key) => key + value)).not.toBe(obj);
  });
  it('does not mutate the original object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    transform(obj, (value, key) => key + value);
    expect(obj).toStrictEqual({ a: '1', b: '2', c: '3' });
  });
  it('returns the original object instance if no changes were applied', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(transform(obj, (value) => value)).toBe(obj);
  });
  it('returns the original object instance if resulting in equal Date values', () => {
    const obj = { a: new Date(1), b: new Date(2) };
    expect(transform(obj, (value) => new Date(value.getTime()))).toBe(obj);
  });
  it('returns the original object if empty', () => {
    const obj = {};
    expect(transform(obj, (value, key) => key + value)).toBe(obj);
  });
});
