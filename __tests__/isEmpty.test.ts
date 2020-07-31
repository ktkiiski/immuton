import isEmpty from '../isEmpty';
import keys from '../keys';

describe('isEmpty()', () => {
  it('returns true for an object without own properties', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(Object.create({ foo: 'bar' }))).toBe(true);
  });
  it('returns true for en empty array', () => {
    expect(isEmpty([])).toBe(true);
  });
  it('returns false for an object with own properties', () => {
    expect(isEmpty({ foo: 'bar' })).toBe(false);
  });
  it('returns false for an non-empty array', () => {
    expect(isEmpty(['foo'])).toBe(false);
  });
  it('type-guards for an empty array', () => {
    const foo: string[] = [];
    if (isEmpty(foo)) {
      const bar: never[] = foo;
      expect(bar.length).toBe(0);
    }
  });
  it('type-guards for an empty object', () => {
    const foo: { [key: string]: unknown } = {};
    if (isEmpty(foo)) {
      const bar: never[] = keys(foo);
      expect(Object.keys(bar).length).toBe(0);
    }
  });
});
