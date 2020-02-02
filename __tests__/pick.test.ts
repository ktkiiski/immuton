import pick from '../pick';
import propertyless from '../propertyless';

describe('pick()', () => {
  it('picks each given property of the object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(pick(obj, ['a', 'b'])).toEqual({ a: '1', b: '2' });
  });
  it('ignores non-existing properties', () => {
    const obj: Record<string, string> = { a: '1', b: '2', c: '3' };
    const result = pick(obj, ['a', 'b', 'd']);
    expect(result).toEqual({ a: '1', b: '2' });
    expect(Object.keys(result)).toEqual(['a', 'b']);
  });
  it('returns another object instance with picked properties', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(pick(obj, ['a', 'b'])).not.toBe(obj);
  });
  it('does not mutate the original object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    pick(obj, ['a', 'b']);
    expect(obj).toEqual({ a: '1', b: '2', c: '3' });
  });
  it('returns the original object instance if picking exactly the same properties', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(pick(obj, ['a', 'b', 'c'])).toBe(obj);
  });
  it('returns the original object instance if picking super-set of object properties', () => {
    const obj: Record<string, string> = { a: '1', b: '2', c: '3' };
    expect(pick(obj, ['a', 'b', 'c', 'd'])).toBe(obj);
  });
  it('returns the original object if empty', () => {
    const obj: Record<string, string> = {};
    expect(pick(obj, ['a', 'b'])).toBe(obj);
  });
  it('returns the empty object singleton if picking no properties', () => {
    const obj = { a: '1', b: '2', c: '3' };
    expect(pick(obj, [])).toBe(propertyless);
  });
  it('returns the empty object singleton if picking no existing properties', () => {
    const obj: Record<string, string> = { a: '1', b: '2', c: '3' };
    expect(pick(obj, ['d', 'e'])).toBe(propertyless);
  });
  it('returns the original object if empty and picking no properties', () => {
    const obj: Record<string, string> = {};
    expect(pick(obj, [])).toBe(obj);
  });
});
