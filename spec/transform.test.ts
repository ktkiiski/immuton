import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import transform from '../src/transform.js';

describe('transform()', () => {
  it('transforms each value in the object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    deepStrictEqual(
      transform(obj, (value, key) => key + value),
      {
        a: 'a1',
        b: 'b2',
        c: 'c3',
      },
    );
  });
  it('transforms values partially in the object', () => {
    const input = {
      property1: 'value1',
      property2: ['value2', 'value3'],
      property3: 'value4',
      property4: [],
    };
    const output = transform(input, (val) => (Array.isArray(val) ? val : [val]));
    deepStrictEqual(output, {
      property1: ['value1'],
      property2: ['value2', 'value3'],
      property3: ['value4'],
      property4: [],
    });
  });
  it('returns another object instance with transformed values', () => {
    const obj = { a: '1', b: '2', c: '3' };
    notStrictEqual(
      transform(obj, (value, key) => key + value),
      obj,
    );
  });
  it('does not mutate the original object', () => {
    const obj = { a: '1', b: '2', c: '3' };
    transform(obj, (value, key) => key + value);
    deepStrictEqual(obj, { a: '1', b: '2', c: '3' });
  });
  it('returns the original object instance if no changes were applied', () => {
    const obj = { a: '1', b: '2', c: '3' };
    strictEqual(
      transform(obj, (value) => value),
      obj,
    );
  });
  it('returns the original object instance if resulting in equal Date values', () => {
    const obj = { a: new Date(1), b: new Date(2) };
    strictEqual(
      transform(obj, (value) => new Date(value.getTime())),
      obj,
    );
  });
  it('returns the original object if empty', () => {
    const obj = {};
    strictEqual(
      transform(obj, (value, key) => key + value),
      obj,
    );
  });
});
