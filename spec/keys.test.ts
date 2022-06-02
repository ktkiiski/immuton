/* eslint-disable max-classes-per-file */
import { deepStrictEqual, strictEqual } from 'assert';
import empty from '../src/empty.js';
import keys from '../src/keys.js';

describe('keys()', () => {
  it('returns each property name of the object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    const props: ('a' | 'b' | 'c')[] = keys(obj);
    deepStrictEqual(props, ['a', 'b', 'c']);
  });
  it('returns the empty array singleton with no properties', () => {
    const obj = {};
    const props: never[] = keys(obj);
    deepStrictEqual(props, []);
    strictEqual(props, empty);
  });
  it('only returns own enumerable property names', () => {
    class ParentClass {
      a() {
        // Mock method
      }
    }
    class SubClass extends ParentClass {
      x = '3';

      y = '4';
    }
    const obj = new SubClass();
    const props: ('a' | 'x' | 'y')[] = keys(obj);
    deepStrictEqual(props, ['x', 'y']);
  });
  it('excludes symbol properties', () => {
    const symbol = Symbol('myTestSymbol');
    const obj = { a: '1', b: '2', [symbol]: '3' };
    const props: ('a' | 'b')[] = keys(obj);
    deepStrictEqual(props, ['a', 'b']);
  });
  it('does not mutate the original object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    keys(obj);
    deepStrictEqual(obj, { a: '1', b: '2', c: '3' });
  });
});
