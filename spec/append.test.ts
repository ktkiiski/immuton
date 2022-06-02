import { notStrictEqual, strictEqual, deepStrictEqual } from 'assert';
import append from '../src/append.js';

describe('append()', () => {
  it('insert the items into the array', () => {
    deepStrictEqual(append([1, 2, 3], 4), [1, 2, 3, 4]);
    deepStrictEqual(append([1, 2, 3], 4, 5), [1, 2, 3, 4, 5]);
  });
  it('returns a copy of the array when changed', () => {
    const array = [1, 2, 3];
    notStrictEqual(append([1, 2, 3], 4, 5), array);
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3];
    append(array, 4, 5);
    deepStrictEqual(array, [1, 2, 3]);
  });
  it('returns the original array instance if no changes were applied', () => {
    const array = [1, 2, 3];
    strictEqual(append(array), array);
  });
  it('returns the original array if empty and not adding anything', () => {
    const array: number[] = [];
    strictEqual(append(array), array);
  });
});
