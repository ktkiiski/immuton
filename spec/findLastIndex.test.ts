import { strictEqual } from 'assert';
import findLastIndex from '../src/findLastIndex.js';

describe('findLastIndex', () => {
  it('returns the index of a matching item', () => {
    strictEqual(
      findLastIndex(['a', 'b', 'c'], (x) => x === 'b'),
      1,
    );
  });
  it('returns the index of a last matching item', () => {
    strictEqual(
      findLastIndex(['a', 'b', 'b', 'c'], (x) => x === 'b'),
      2,
    );
  });
  it('returns -1 if no matching item is found', () => {
    strictEqual(
      findLastIndex(['a', 'b', 'c'], (x) => x === 'd'),
      -1,
    );
  });
  it('returns -1 for an empty array', () => {
    strictEqual(
      findLastIndex([], (x) => x === 'x'),
      -1,
    );
  });
});
