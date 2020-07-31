/* eslint-disable max-classes-per-file */
import keys from '../keys';
import empty from '../empty';

describe('keys()', () => {
  it('returns each property name of the object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    const props: ('a' | 'b' | 'c')[] = keys(obj);
    expect(props).toStrictEqual(['a', 'b', 'c']);
  });
  it('returns the empty array singleton with no properties', () => {
    const obj = {};
    const props: never[] = keys(obj);
    expect(props).toStrictEqual([]);
    expect(props).toBe(empty);
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
    expect(props).toStrictEqual(['x', 'y']);
  });
  it('excludes symbol properties', () => {
    const symbol = Symbol('myTestSymbol');
    const obj = { a: '1', b: '2', [symbol]: '3' };
    const props: ('a' | 'b')[] = keys(obj);
    expect(props).toStrictEqual(['a', 'b']);
  });
  it('does not mutate the original object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    keys(obj);
    expect(obj).toStrictEqual({ a: '1', b: '2', c: '3' });
  });
});
