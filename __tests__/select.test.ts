import isDefined from '../isDefined';
import isNotNull from '../isNotNull';
import isNotNully from '../isNotNully';
import isNull from '../isNull';
import isNully from '../isNully';
import isUndefined from '../isUndefined';
import propertyless from '../propertyless';
import select from '../select';

describe('select()', () => {
  it('filters each property in the object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(select(obj, (value) => value % 2 > 0)).toStrictEqual({ a: 1, c: 3 });
  });
  it('returns another object instance with transformed values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(select(obj, (value) => value % 2 > 0)).not.toBe(obj);
  });
  it('does not mutate the original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    select(obj, (value) => value % 2 > 0);
    expect(obj).toStrictEqual({ a: 1, b: 2, c: 3 });
  });
  it('returns the original object instance if all properties are picked', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(select(obj, () => true)).toBe(obj);
  });
  it('returns the empty object singleton if all properties are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(select(obj, () => false)).toBe(propertyless);
  });
  it('returns the original object if empty', () => {
    const obj = {};
    expect(select(obj, () => true)).toBe(obj);
  });
  it('exclude omitted value types', () => {
    function isStringValue(value: string | number): value is string {
      return typeof value === 'string';
    }
    const obj = {
      a: 1,
      b: '2',
      c: 3,
      d: '4',
    };
    const result: { b: string; d: string } = select(obj, isStringValue);
    expect(result).toStrictEqual({ b: '2', d: '4' });
  });
  it('exclude omitted key types', () => {
    function isFoobarKey(value: number, key: 'foo' | 'bar' | 'foobar'): key is 'foobar' {
      return key === 'foobar';
    }
    const obj = {
      foo: 1,
      bar: 2,
      foobar: 3,
    };
    const result: { foobar: number } = select(obj, isFoobarKey);
    expect(result).toStrictEqual({ foobar: 3 });
  });
  it('pick null values', () => {
    const obj = { null: null as null, notNull: 'foobar' as string };
    const result: { null: null } = select(obj, isNull);
    expect(result).toStrictEqual({ null: null });
  });
  it('pick undefined values', () => {
    const obj = { undef: undefined as undefined, def: 'foobar' as string };
    const result: { undef: undefined } = select(obj, isUndefined);
    expect(result).toStrictEqual({ undef: undefined });
  });
  it('pick nully values', () => {
    const obj = { null: null as null, undef: undefined as undefined, def: 'foobar' as string };
    const result: { null: null; undef: undefined } = select(obj, isNully);
    expect(result).toStrictEqual({ null: null, undef: undefined });
  });
  it('omit null values', () => {
    const obj = { null: null as null, notNull: 'foobar' as string, maybe: 1 as number | null };
    const result: { notNull: string; maybe: number } = select(obj, isNotNull);
    expect(result).toStrictEqual({ notNull: 'foobar', maybe: 1 });
  });
  it('omit undefined values', () => {
    const obj = { undef: undefined as undefined, def: 'foobar' as string, maybe: 1 as number | undefined };
    const result: { def: string; maybe: number } = select(obj, isDefined);
    expect(result).toStrictEqual({ def: 'foobar', maybe: 1 });
  });
  it('omit nully values', () => {
    const obj = {
      null: null as null,
      undef: undefined as undefined,
      def: 'foobar' as string,
      maybe: 1 as number | undefined | null,
    };
    const result: { def: string; maybe: number } = select(obj, isNotNully);
    expect(result).toStrictEqual({ def: 'foobar', maybe: 1 });
  });
});
