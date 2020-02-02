import isEqual from '../isEqual';

describe('isEqual()', () => {
  it('returns true for two null values', () => {
    expect(isEqual(null, null)).toBe(true);
  });
  it('returns false for null and undefined', () => {
    expect(!isEqual(null, undefined)).toBe(true);
  });
  it('returns true for equal integers', () => {
    expect(isEqual(123, 123)).toBe(true);
  });
  it('returns false for unequal integers', () => {
    expect(isEqual(123, -123)).toBe(false);
  });
  it('returns true for NaN values', () => {
    expect(isEqual(NaN, NaN)).toBe(true);
  });
  it('returns false for positive and negative zero', () => {
    expect(isEqual(-0, 0)).toBe(false);
  });
  it('returns true for infinities', () => {
    expect(isEqual(Infinity, Infinity)).toBe(true);
    expect(isEqual(-Infinity, -Infinity)).toBe(true);
  });
  it('returns true for objects with equal attributes', () => {
    expect(isEqual({ name: 'John', age: 1 }, { name: 'John', age: 1 })).toBe(true);
  });
  it('returns false for objects with unequal attributes', () => {
    expect(isEqual({ name: 'John', age: 1 }, { name: 'Jane', age: 1 })).toBe(false);
  });
  it('returns false for objects with different properties', () => {
    expect(isEqual({ name: 'John', foo: 'Z' }, { name: 'John', bar: 'Z' })).toBe(false);
  });
  it('returns true for objects with recursive equal attributes', () => {
    const a: any = { name: 'John' };
    a.self = a;
    const b: any = { name: 'John' };
    b.self = b;
    expect(isEqual(a, b)).toBe(true);
  });
  it('returns true for objects with cross-referencing attributes', () => {
    const a: any = { name: 'John' };
    const b: any = { name: 'John', ref: a };
    a.ref = b;
    expect(isEqual(a, b)).toBe(true);
  });
  it('returns true for objects with deep recursive equal attributes', () => {
    const a1: any = { name: 'John 1' };
    const a2: any = { name: 'John 2', ref: a1 };
    a1.ref = a2;
    const b1: any = { name: 'John 1' };
    const b2: any = { name: 'John 2', ref: b1 };
    b1.ref = b2;
    expect(isEqual(a1, b1)).toBe(true);
  });
  it('returns false for objects with recursive unequal attributes', () => {
    const a: any = { name: 'John' };
    a.self = a;
    a.x = 'XXX';
    const b: any = { name: 'John' };
    b.self = b;
    b.x = 'YYY';
    expect(isEqual(a, b)).toBe(false);
  });
  it('returns false for objects with deep recursive unequal attributes', () => {
    const a1: any = { name: 'John 1' };
    const a2: any = { name: 'John 2', ref: a1, x: 'XXX' };
    a1.ref = a2;
    const b1: any = { name: 'John 1' };
    const b2: any = { name: 'John 2', ref: b1, x: 'YYY' };
    b1.ref = b2;
    expect(isEqual(a1, b1)).toBe(false);
  });
});
