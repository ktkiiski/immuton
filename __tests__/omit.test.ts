import omit from '../omit';
import propertyless from '../propertyless';

describe('omit()', () => {
  it('omits each given property of the object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(omit(obj, ['a'])).toEqual({ b: '2', c: '3' });
    expect(omit(obj, ['a', 'b'])).toEqual({ c: '3' });
  });
  it('ignores non-existing properties', () => {
    const obj: Record<string, string> = { a: '1', b: '2', c: '3' };
    const result = omit(obj, ['c', 'd', 'e']);
    expect(result).toEqual({ a: '1', b: '2' });
    expect(Object.keys(result)).toEqual(['a', 'b']);
  });
  it('returns another object instance', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(omit(obj, ['a'])).not.toBe(obj);
    expect(omit(obj, ['a', 'b'])).not.toBe(obj);
  });
  it('does not mutate the original object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    omit(obj, ['a', 'b']);
    expect(obj).toEqual({ a: '1', b: '2', c: '3' });
  });
  it('returns the original object instance if object has no omitted properties', () => {
    const obj: Record<string, string> = { a: '1', b: '2', c: '3' };
    expect(omit(obj, ['d', 'e', 'f'])).toBe(obj);
  });
  it('returns the original object if empty', () => {
    const obj: Record<string, string> = {};
    expect(omit(obj, [])).toBe(obj);
    expect(omit(obj, ['a'])).toBe(obj);
    expect(omit(obj, ['a', 'b'])).toBe(obj);
  });
  it('returns the empty object singleton if omitting all the properties', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(omit(obj, ['a', 'b', 'c'])).toBe(propertyless);
  });
  it('returns the empty object singleton if omit list contains all object properties', () => {
    const obj: Record<string, string> = { a: '1', b: '2', c: '3' };
    expect(omit(obj, ['a', 'b', 'c', 'd'])).toBe(propertyless);
  });
});
