import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import objectDifference from '../src/objectDifference.js';
import propertyless from '../src/propertyless.js';

describe('objectDifference()', () => {
  it('returns properties that have different values', () => {
    const obj1 = { a: 'a1', b: 'b1', c: 'c1' };
    const obj2 = { a: 'a2', b: 'b1', c: 'c2' };
    deepStrictEqual(objectDifference(obj1, obj2), { a: 'a2', c: 'c2' });
  });
  it('returns properties that do not exist in the first object', () => {
    const obj1 = { a: 'a1' };
    const obj2 = { a: 'a1', b: 'b1', c: 'c1' };
    deepStrictEqual(objectDifference(obj1, obj2), { b: 'b1', c: 'c1' });
  });
  it('compares Date values by their equality', () => {
    const obj1 = { a: new Date(1000), b: new Date(2000) };
    const obj2 = { a: new Date(1000), b: new Date(3000) };
    deepStrictEqual(objectDifference(obj1, obj2), { b: new Date(3000) });
  });
  it('compares object values by their equality', () => {
    const obj1 = { a: { x: 'X' }, b: { x: 'X' } };
    const obj2 = { a: { x: 'X' }, b: { y: 'Y' } };
    deepStrictEqual(objectDifference(obj1, obj2), { b: { y: 'Y' } });
  });
  it('does not compare object values by their equality if zero depth', () => {
    const z = { z: 'Z' };
    const obj1 = { a: { x: 'X' }, b: { x: 'X' }, c: z };
    const obj2 = { a: { x: 'X' }, b: { y: 'Y' }, c: z };
    deepStrictEqual(objectDifference(obj1, obj2, 0), { a: { x: 'X' }, b: { y: 'Y' } });
  });
  it('ignores properties that do not exist in the second object', () => {
    const obj1 = { a: 'a1', b: 'b1', c: 'c1' };
    const obj2 = { a: 'a1', b: 'b2' };
    deepStrictEqual(objectDifference(obj1, obj2), { b: 'b2' });
  });
  it('returns another object instance with picked properties', () => {
    const obj1 = { a: 'a1', b: 'b1', c: 'c1' };
    const obj2 = { a: 'a2', b: 'b1', c: 'c2' };
    notStrictEqual(objectDifference(obj1, obj2), obj1);
    notStrictEqual(objectDifference(obj1, obj2), obj2);
  });
  it('does not mutate the original objects', () => {
    const obj1 = { a: 'a1', b: 'b1', c: 'c1' };
    const obj2 = { a: 'a2', b: 'b1', c: 'c2' };
    objectDifference(obj1, obj2);
    deepStrictEqual(obj1, { a: 'a1', b: 'b1', c: 'c1' });
    deepStrictEqual(obj2, { a: 'a2', b: 'b1', c: 'c2' });
  });
  it('returns the second parameter if all the properties are different', () => {
    const obj1 = { a: 'a1', b: 'b1', c: 'c1' };
    const obj2 = { a: 'a2', b: 'b2', c: 'c2' };
    strictEqual(objectDifference(obj1, obj2), obj2);
  });
  it('returns the empty object singleton if objects are equal', () => {
    const obj1 = { a: 'a1', b: 'b1', c: 'c1' };
    const obj2 = { a: 'a1', b: 'b1', c: 'c1' };
    strictEqual(objectDifference(obj1, obj2), propertyless);
  });
  it('returns the empty object singleton if both objects are empty', () => {
    const obj1 = {};
    const obj2 = {};
    strictEqual(objectDifference(obj1, obj2), propertyless);
  });
});
