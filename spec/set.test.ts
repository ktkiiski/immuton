import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import set from '../src/set.js';

describe('set()', () => {
  it('sets property to another value', () => {
    deepStrictEqual(set({ foo: 'foo', bar: 'bar' }, 'foo', 'FOO'), { foo: 'FOO', bar: 'bar' });
  });
  it('returns another obj instance with transformed values', () => {
    const obj = { foo: 'foo', bar: 'bar' };
    notStrictEqual(set(obj, 'foo', 'FOO'), obj);
  });
  it('does not mutate the original obj', () => {
    const obj = { foo: 'foo', bar: 'bar' };
    set(obj, 'foo', 'FOO');
    deepStrictEqual(obj, { foo: 'foo', bar: 'bar' });
  });
  it('returns the original obj instance if no changes were applied', () => {
    const obj = { foo: 'foo', bar: 'bar' };
    strictEqual(set(obj, 'foo', 'foo'), obj);
  });
});
