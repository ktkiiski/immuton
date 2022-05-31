import editProperty from '../src/editProperty.js';

describe('editProperty()', () => {
  it('sets property to another value', () => {
    expect(editProperty({ foo: 1, bar: 2 }, 'foo', (x) => x + 3)).toEqual({ foo: 4, bar: 2 });
  });
  it('returns another obj instance with transformed values', () => {
    const obj = { foo: 1, bar: 2 };
    expect(editProperty(obj, 'foo', (x) => x + 2)).not.toBe(obj);
  });
  it('does not mutate the original obj', () => {
    const obj = { foo: 1, bar: 2 };
    editProperty(obj, 'foo', (x) => x + 2);
    expect(obj).toEqual({ foo: 1, bar: 2 });
  });
  it('returns the original obj instance if no changes were applied', () => {
    const obj = { foo: 1, bar: 2 };
    expect(editProperty(obj, 'foo', (x) => x)).toBe(obj);
  });
});
