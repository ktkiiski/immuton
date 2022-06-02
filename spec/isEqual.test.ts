/* eslint-disable @typescript-eslint/no-explicit-any */
import { strictEqual } from 'assert';
import isEqual from '../src/isEqual.js';

describe('isEqual()', () => {
  it('returns true for two null values', () => {
    strictEqual(isEqual(null, null), true);
  });
  it('returns false for null and undefined', () => {
    strictEqual(!isEqual(null, undefined), true);
  });
  it('returns true for equal integers', () => {
    strictEqual(isEqual(123, 123), true);
  });
  it('returns false for unequal integers', () => {
    strictEqual(isEqual(123, -123), false);
  });
  it('returns true for NaN values', () => {
    strictEqual(isEqual(NaN, NaN), true);
  });
  it('returns false for positive and negative zero', () => {
    strictEqual(isEqual(-0, 0), false);
  });
  it('returns true for infinities', () => {
    strictEqual(isEqual(Infinity, Infinity), true);
    strictEqual(isEqual(-Infinity, -Infinity), true);
  });
  it('returns true for objects with equal attributes', () => {
    strictEqual(isEqual({ name: 'John', age: 1 }, { name: 'John', age: 1 }), true);
  });
  it('returns false for objects with unequal attributes', () => {
    strictEqual(isEqual({ name: 'John', age: 1 }, { name: 'Jane', age: 1 }), false);
  });
  it('returns false for objects with different properties', () => {
    strictEqual(isEqual({ name: 'John', foo: 'Z' }, { name: 'John', bar: 'Z' }), false);
  });
  it('returns true for objects with recursive equal attributes', () => {
    const a: any = { name: 'John' };
    a.self = a;
    const b: any = { name: 'John' };
    b.self = b;
    strictEqual(isEqual(a, b), true);
  });
  it('returns true for objects with cross-referencing attributes', () => {
    const a: any = { name: 'John' };
    const b: any = { name: 'John', ref: a };
    a.ref = b;
    strictEqual(isEqual(a, b), true);
  });
  it('returns true for objects with deep recursive equal attributes', () => {
    const a1: any = { name: 'John 1' };
    const a2: any = { name: 'John 2', ref: a1 };
    a1.ref = a2;
    const b1: any = { name: 'John 1' };
    const b2: any = { name: 'John 2', ref: b1 };
    b1.ref = b2;
    strictEqual(isEqual(a1, b1), true);
  });
  it('returns false for objects with recursive unequal attributes', () => {
    const a: any = { name: 'John' };
    a.self = a;
    a.x = 'XXX';
    const b: any = { name: 'John' };
    b.self = b;
    b.x = 'YYY';
    strictEqual(isEqual(a, b), false);
  });
  it('returns false for objects with deep recursive unequal attributes', () => {
    const a1: any = { name: 'John 1' };
    const a2: any = { name: 'John 2', ref: a1, x: 'XXX' };
    a1.ref = a2;
    const b1: any = { name: 'John 1' };
    const b2: any = { name: 'John 2', ref: b1, x: 'YYY' };
    b1.ref = b2;
    strictEqual(isEqual(a1, b1), false);
  });
});
