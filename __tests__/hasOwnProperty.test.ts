import hasOwnProperty from '../hasOwnProperty';

describe('hasOwnProperty()', () => {
  it('returns true if object has own property', () => {
    const obj = { a: 'A1', b: 'B1', c: 'C1' };
    expect(hasOwnProperty(obj, 'a')).toBe(true);
    expect(hasOwnProperty(obj, 'b')).toBe(true);
    expect(hasOwnProperty(obj, 'c')).toBe(true);
  });
  it('returns false if object does not have property', () => {
    const obj = { a: 'A1', b: 'B1', c: 'C1' };
    expect(hasOwnProperty(obj, 'e')).toBe(false);
    expect(hasOwnProperty(obj, 'f')).toBe(false);
    expect(hasOwnProperty(obj, 'g')).toBe(false);
  });
  it('returns false for null object', () => {
    const result: false = hasOwnProperty(null, 'foo');
    expect(result).toBe(false);
  });
  it('returns false for undefined object', () => {
    const result: false = hasOwnProperty(undefined, 'foo');
    expect(result).toBe(false);
  });
  it('type-guards an unknown type to an object with a property', () => {
    const something: unknown = { foo: 'FOO', bar: 'BAR' };
    if (hasOwnProperty(something, 'foo')) {
      const obj: { foo: unknown } = something;
      expect(obj.foo).toBe('FOO');
    } else {
      fail();
    }
  });
  it('type-guards an union type to a matching sub-type', () => {
    const something: { firstName: string; lastName: string } | { name: string } = {
      firstName: 'John',
      lastName: 'Smith',
    };
    if (hasOwnProperty(something, 'firstName')) {
      const obj: { firstName: string; lastName: string } = something;
      expect(obj.firstName).toBe('John');
      expect(obj.lastName).toBe('Smith');
    } else {
      fail();
    }
  });
});
