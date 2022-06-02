import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import pick from '../src/pick.js';
import propertyless from '../src/propertyless.js';

describe('pick()', () => {
  it('picks each given property of the object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    deepStrictEqual(pick(obj, ['a', 'b']), { a: '1', b: '2' });
  });
  it('ignores non-existing properties', () => {
    const obj: Record<string, string> = { a: '1', b: '2', c: '3' };
    const result = pick(obj, ['a', 'b', 'd']);
    deepStrictEqual(result, { a: '1', b: '2' });
  });
  it('returns another object instance with picked properties', () => {
    const obj = { a: '1', b: '2', c: '3' };
    notStrictEqual(pick(obj, ['a', 'b']), obj);
  });
  it('does not mutate the original object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    pick(obj, ['a', 'b']);
    deepStrictEqual(obj, { a: '1', b: '2', c: '3' });
  });
  it('returns the original object instance if picking exactly the same properties', () => {
    const obj = { a: '1', b: '2', c: '3' };
    strictEqual(pick(obj, ['a', 'b', 'c']), obj);
  });
  it('returns the original object instance if picking super-set of object properties', () => {
    const obj: Record<string, string> = { a: '1', b: '2', c: '3' };
    strictEqual(pick(obj, ['a', 'b', 'c', 'd']), obj);
  });
  it('returns the original object if empty', () => {
    const obj: Record<string, string> = {};
    strictEqual(pick(obj, ['a', 'b']), obj);
  });
  it('returns the empty object singleton if picking no properties', () => {
    const obj = { a: '1', b: '2', c: '3' };
    strictEqual(pick(obj, []), propertyless);
  });
  it('returns the empty object singleton if picking no existing properties', () => {
    const obj: Record<string, string> = { a: '1', b: '2', c: '3' };
    strictEqual(pick(obj, ['d', 'e']), propertyless);
  });
  it('returns the original object if empty and picking no properties', () => {
    const obj: Record<string, string> = {};
    strictEqual(pick(obj, []), obj);
  });
});
