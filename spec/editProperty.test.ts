import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import editProperty from '../src/editProperty.js';

describe('editProperty()', () => {
  it('sets property to another value', () => {
    deepStrictEqual(
      editProperty({ foo: 1, bar: 2 }, 'foo', (x) => x + 3),
      { foo: 4, bar: 2 },
    );
  });
  it('returns another obj instance with transformed values', () => {
    const obj = { foo: 1, bar: 2 };
    notStrictEqual(
      editProperty(obj, 'foo', (x) => x + 2),
      obj,
    );
  });
  it('does not mutate the original obj', () => {
    const obj = { foo: 1, bar: 2 };
    editProperty(obj, 'foo', (x) => x + 2);
    deepStrictEqual(obj, { foo: 1, bar: 2 });
  });
  it('returns the original obj instance if no changes were applied', () => {
    const obj = { foo: 1, bar: 2 };
    strictEqual(
      editProperty(obj, 'foo', (x) => x),
      obj,
    );
  });
});
