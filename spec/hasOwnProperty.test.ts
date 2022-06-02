import { fail, strictEqual } from 'assert';
import hasOwnProperty from '../src/hasOwnProperty.js';

describe('hasOwnProperty()', () => {
  it('returns true if object has own property', () => {
    const obj = { a: 'A1', b: 'B1', c: 'C1' };
    strictEqual(hasOwnProperty(obj, 'a'), true);
    strictEqual(hasOwnProperty(obj, 'b'), true);
    strictEqual(hasOwnProperty(obj, 'c'), true);
  });
  it('returns false if object does not have property', () => {
    const obj = { a: 'A1', b: 'B1', c: 'C1' };
    strictEqual(hasOwnProperty(obj, 'e'), false);
    strictEqual(hasOwnProperty(obj, 'f'), false);
    strictEqual(hasOwnProperty(obj, 'g'), false);
  });
  it('returns false for null object', () => {
    const result: false = hasOwnProperty(null, 'foo');
    strictEqual(result, false);
  });
  it('returns false for undefined object', () => {
    const result: false = hasOwnProperty(undefined, 'foo');
    strictEqual(result, false);
  });
  it('type-guards an unknown type to an object with a property', () => {
    const something: unknown = { foo: 'FOO', bar: 'BAR' };
    if (hasOwnProperty(something, 'foo')) {
      const obj: { foo: unknown } = something;
      strictEqual(obj.foo, 'FOO');
    } else {
      fail();
    }
  });
  it('type-guards an union type to a matching sub-type', () => {
    const something: { firstName: string; lastName: string } | { name: string } = {
      firstName: 'John',
      lastName: 'Smith',
    };
    if (hasOwnProperty(something, 'firstName')) {
      const obj: { firstName: string; lastName: string } = something;
      strictEqual(obj.firstName, 'John');
      strictEqual(obj.lastName, 'Smith');
    } else {
      fail();
    }
  });
});
