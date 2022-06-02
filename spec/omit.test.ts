import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import omit from '../src/omit.js';
import propertyless from '../src/propertyless.js';

describe('omit()', () => {
  it('omits each given property of the object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    deepStrictEqual(omit(obj, ['a']), { b: '2', c: '3' });
    deepStrictEqual(omit(obj, ['a', 'b']), { c: '3' });
  });
  it('ignores non-existing properties', () => {
    const obj: Record<string, string> = { a: '1', b: '2', c: '3' };
    const result = omit(obj, ['c', 'd', 'e']);
    deepStrictEqual(result, { a: '1', b: '2' });
  });
  it('returns another object instance', () => {
    const obj = { a: '1', b: '2', c: '3' };
    notStrictEqual(omit(obj, ['a']), obj);
    notStrictEqual(omit(obj, ['a', 'b']), obj);
  });
  it('does not mutate the original object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    omit(obj, ['a', 'b']);
    deepStrictEqual(obj, { a: '1', b: '2', c: '3' });
  });
  it('returns the original object instance if object has no omitted properties', () => {
    const obj: Record<string, string> = { a: '1', b: '2', c: '3' };
    strictEqual(omit(obj, ['d', 'e', 'f']), obj);
  });
  it('returns the original object if empty', () => {
    const obj: Record<string, string> = {};
    strictEqual(omit(obj, []), obj);
    strictEqual(omit(obj, ['a']), obj);
    strictEqual(omit(obj, ['a', 'b']), obj);
  });
  it('returns the empty object singleton if omitting all the properties', () => {
    const obj = { a: '1', b: '2', c: '3' };
    strictEqual(omit(obj, ['a', 'b', 'c']), propertyless);
  });
  it('returns the empty object singleton if omit list contains all object properties', () => {
    const obj: Record<string, string> = { a: '1', b: '2', c: '3' };
    strictEqual(omit(obj, ['a', 'b', 'c', 'd']), propertyless);
  });
});
