import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import isDefined from '../src/isDefined.js';
import isNotNull from '../src/isNotNull.js';
import isNotNully from '../src/isNotNully.js';
import isNull from '../src/isNull.js';
import isNully from '../src/isNully.js';
import isUndefined from '../src/isUndefined.js';
import propertyless from '../src/propertyless.js';
import select from '../src/select.js';

describe('select()', () => {
  it('filters each property in the object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    deepStrictEqual(
      select(obj, (value) => value % 2 > 0),
      { a: 1, c: 3 },
    );
  });
  it('returns another object instance with transformed values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    notStrictEqual(
      select(obj, (value) => value % 2 > 0),
      obj,
    );
  });
  it('does not mutate the original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    select(obj, (value) => value % 2 > 0);
    deepStrictEqual(obj, { a: 1, b: 2, c: 3 });
  });
  it('returns the original object instance if all properties are picked', () => {
    const obj = { a: 1, b: 2, c: 3 };
    strictEqual(
      select(obj, () => true),
      obj,
    );
  });
  it('returns the empty object singleton if all properties are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    strictEqual(
      select(obj, () => false),
      propertyless,
    );
  });
  it('returns the original object if empty', () => {
    const obj = {};
    strictEqual(
      select(obj, () => true),
      obj,
    );
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
    deepStrictEqual(result, { b: '2', d: '4' });
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
    deepStrictEqual(result, { foobar: 3 });
  });
  it('pick null values', () => {
    const obj = { null: null as null, notNull: 'foobar' as string };
    const result: { null: null } = select(obj, isNull);
    deepStrictEqual(result, { null: null });
  });
  it('pick undefined values', () => {
    const obj = { undef: undefined as undefined, def: 'foobar' as string };
    const result: { undef: undefined } = select(obj, isUndefined);
    deepStrictEqual(result, { undef: undefined });
  });
  it('pick nully values', () => {
    const obj = { null: null as null, undef: undefined as undefined, def: 'foobar' as string };
    const result: { null: null; undef: undefined } = select(obj, isNully);
    deepStrictEqual(result, { null: null, undef: undefined });
  });
  it('omit null values', () => {
    const obj = { null: null as null, notNull: 'foobar' as string, maybe: 1 as number | null };
    const result: { notNull: string; maybe: number } = select(obj, isNotNull);
    deepStrictEqual(result, { notNull: 'foobar', maybe: 1 });
  });
  it('omit undefined values', () => {
    const obj = { undef: undefined as undefined, def: 'foobar' as string, maybe: 1 as number | undefined };
    const result: { def: string; maybe: number } = select(obj, isDefined);
    deepStrictEqual(result, { def: 'foobar', maybe: 1 });
  });
  it('omit nully values', () => {
    const obj = {
      null: null as null,
      undef: undefined as undefined,
      def: 'foobar' as string,
      maybe: 1 as number | undefined | null,
    };
    const result: { def: string; maybe: number } = select(obj, isNotNully);
    deepStrictEqual(result, { def: 'foobar', maybe: 1 });
  });
});
