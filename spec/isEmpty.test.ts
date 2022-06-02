import { strictEqual } from 'assert';
import isEmpty from '../src/isEmpty.js';
import keys from '../src/keys.js';

describe('isEmpty()', () => {
  it('returns true for an object without own properties', () => {
    strictEqual(isEmpty({}), true);
    strictEqual(isEmpty(Object.create({ foo: 'bar' })), true);
  });
  it('returns true for en empty array', () => {
    strictEqual(isEmpty([]), true);
  });
  it('returns false for an object with own properties', () => {
    strictEqual(isEmpty({ foo: 'bar' }), false);
  });
  it('returns false for an non-empty array', () => {
    strictEqual(isEmpty(['foo']), false);
  });
  it('type-guards for an empty array', () => {
    const foo: string[] = [];
    if (isEmpty(foo)) {
      const bar: never[] = foo;
      strictEqual(bar.length, 0);
    }
  });
  it('type-guards for an empty object', () => {
    const foo: { [key: string]: unknown } = {};
    if (isEmpty(foo)) {
      const bar: never[] = keys(foo);
      strictEqual(Object.keys(bar).length, 0);
    }
  });
});
