import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import empty from '../src/empty.js';
import splice from '../src/splice.js';

describe('splice()', () => {
  it('deletes items from the array', () => {
    deepStrictEqual(splice([1, 2, 3, 4, 5], 1, 2), [1, 4, 5]);
  });
  it('inserts items into the array', () => {
    deepStrictEqual(splice([1, 2, 5], 2, 0, 3, 4), [1, 2, 3, 4, 5]);
  });
  it('deletes and inserts from/into the array', () => {
    deepStrictEqual(splice([1, 1, 5], 1, 1, 2, 3, 4), [1, 2, 3, 4, 5]);
  });
  it('returns a copy of the array when changed', () => {
    const array = [1, 2, 3];
    notStrictEqual(splice([1, 2, 3, 4, 5], 1, 2), array);
  });
  it('does not mutate the original array', () => {
    const array = [1, 2, 3];
    splice(array, 1, 1, 4, 5);
    deepStrictEqual(array, [1, 2, 3]);
  });
  it('returns the original array instance if no changes were applied', () => {
    const array = [1, 2, 3];
    strictEqual(splice(array, 1, 0), array);
  });
  it('returns the original array if empty and not adding anything', () => {
    const array: number[] = [];
    strictEqual(splice(array, 1, 1), array);
  });
  it('returns the empty singleton array if removed everything', () => {
    strictEqual(splice([1, 2, 3], 0, 3), empty);
  });
});
