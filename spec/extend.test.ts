import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import extend from '../src/extend.js';

describe('extend()', () => {
  it('sets all properties to another values', () => {
    deepStrictEqual(extend({ foo: 'foo', bar: 'bar' }, { bar: 'BAR', foobar: 'FOOBAR' }), {
      foo: 'foo',
      bar: 'BAR',
      foobar: 'FOOBAR',
    });
  });
  it('returns another obj instance with transformed values', () => {
    const obj1 = { foo: 'foo', bar: 'bar' };
    const obj2 = { bar: 'BAR', foobar: 'FOOBAR' };
    notStrictEqual(extend(obj1, obj2), obj1);
    notStrictEqual(extend(obj1, obj2), obj2);
  });
  it('does not mutate the original objects', () => {
    const obj1 = { foo: 'foo', bar: 'bar' };
    const obj2 = { bar: 'BAR', foobar: 'FOOBAR' };
    extend(obj1, obj2);
    deepStrictEqual(obj1, { foo: 'foo', bar: 'bar' });
    deepStrictEqual(obj2, { bar: 'BAR', foobar: 'FOOBAR' });
  });
  it('returns the first obj instance if no changes were applied', () => {
    const obj = { foo: 'foo', bar: 'bar', foobar: 'foobar' };
    strictEqual(extend(obj, { foo: 'foo', foobar: 'foobar' }), obj);
  });
  it('returns the first obj instance if changes are empty', () => {
    const obj = { foo: 'foo', bar: 'bar', foobar: 'foobar' };
    strictEqual(extend(obj, {}), obj);
  });
  it('returns the second obj instance if all properties are overridden', () => {
    const obj1 = { foo: 'foo', bar: 'bar' };
    const obj2 = { foo: 'foo', bar: 'bar', foobar: 'foobar' };
    strictEqual(extend(obj1, obj2), obj2);
  });
});
