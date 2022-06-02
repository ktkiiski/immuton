import { strictEqual } from 'assert';
import hasProperties from '../src/hasProperties.js';

describe('hasProperties()', () => {
  it('returns true if object has all given properties', () => {
    const obj1 = { a: 'A1', b: 'B1', c: 'C1' };
    const obj2 = { a: 'A1', c: 'C1' };
    strictEqual(hasProperties(obj1, obj2), true);
  });
  it('returns true if objects have equal properties', () => {
    const obj1 = { a: 'A1', b: 'B1', c: 'C1' };
    const obj2 = { c: 'C1', b: 'B1', a: 'A1' };
    strictEqual(hasProperties(obj1, obj2), true);
  });
  it('returns false if any property has unequal value', () => {
    const obj1 = { a: 'A1', b: 'B1', c: 'C1' };
    const obj2 = { a: 'A1', b: 'B2' };
    strictEqual(hasProperties(obj1, obj2), false);
  });
  it('returns false if any property is missing', () => {
    const obj1 = { a: 'A1', b: 'B1', c: 'C1' };
    const obj2 = { a: 'A1', d: 'D1' };
    strictEqual(hasProperties(obj1, obj2), false);
  });
  it('returns true if no required properties', () => {
    const obj1 = { a: 'A1', b: 'B1', c: 'C1' };
    const obj2 = {};
    strictEqual(hasProperties(obj1, obj2), true);
  });
  it('returns true if both objects are empty', () => {
    strictEqual(hasProperties({}, {}), true);
  });
  it('returns true for equal date values', () => {
    const obj1 = { a: new Date(1), b: new Date(2) };
    const obj2 = { a: new Date(1), b: new Date(2) };
    strictEqual(hasProperties(obj1, obj2), true);
  });
  it('returns true for equal array and object values', () => {
    const obj1 = { a: [1, 2], b: { x: 'X' } };
    const obj2 = { a: [1, 2], b: { x: 'X' } };
    strictEqual(hasProperties(obj1, obj2), true);
  });
  it('returns false for equal array and object values with zero depth', () => {
    const obj1 = { a: [1, 2], b: { x: 'X' } };
    const obj2 = { a: [1, 2], b: { x: 'X' } };
    strictEqual(hasProperties(obj1, obj2, 0), false);
  });
  it('returns true for same array and object references with zero depth', () => {
    const a = [1, 2];
    const b = { x: 'X' };
    const obj1 = { a, b };
    const obj2 = { a, b };
    strictEqual(hasProperties(obj1, obj2, 0), true);
  });
});
