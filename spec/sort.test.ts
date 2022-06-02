import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import empty from '../src/empty.js';
import sort from '../src/sort.js';

describe('sort()', () => {
  it('sorts values in ascending order by default', () => {
    deepStrictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val)),
      ['0', '1', '10', '20'],
    );
    deepStrictEqual(
      sort(['10', '1', '20', '0'], (val) => parseFloat(val)),
      ['0', '1', '10', '20'],
    );
  });
  it('sorts values in ascending order', () => {
    deepStrictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'asc'),
      ['0', '1', '10', '20'],
    );
    deepStrictEqual(
      sort(['10', '1', '20', '0'], (val) => parseFloat(val), 'asc'),
      ['0', '1', '10', '20'],
    );
  });
  it('sorts values in descending order', () => {
    deepStrictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'desc'),
      ['20', '10', '1', '0'],
    );
    deepStrictEqual(
      sort(['10', '1', '20', '0'], (val) => parseFloat(val), 'desc'),
      ['20', '10', '1', '0'],
    );
  });
  it('filters values after the since parameter', () => {
    deepStrictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'asc', -1),
      ['0', '1', '10', '20'],
    );
    deepStrictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'asc', 0),
      ['1', '10', '20'],
    );
    deepStrictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'asc', 1),
      ['10', '20'],
    );
    deepStrictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'asc', 10),
      ['20'],
    );
    deepStrictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'asc', 20),
      [],
    );
  });
  it('filters values before the since parameter', () => {
    deepStrictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'desc', 21),
      ['20', '10', '1', '0'],
    );
    deepStrictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'desc', 20),
      ['10', '1', '0'],
    );
    deepStrictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'desc', 10),
      ['1', '0'],
    );
    deepStrictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'desc', 1),
      ['0'],
    );
    deepStrictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'desc', 0),
      [],
    );
  });
  it('preserves original order for equal items when sorting ascending', () => {
    const a1 = { x: 'a', index: 1 };
    const a2 = { x: 'a', index: 2 };
    const b1 = { x: 'b', index: 1 };
    const b2 = { x: 'b', index: 2 };
    deepStrictEqual(
      sort([a1, b1, a2, b2], (val) => val.x, 'asc'),
      [a1, a2, b1, b2],
    );
    deepStrictEqual(
      sort([a2, b1, a1, b2], (val) => val.x, 'asc'),
      [a2, a1, b1, b2],
    );
    deepStrictEqual(
      sort([b2, b1, a1, a2], (val) => val.x, 'asc'),
      [a1, a2, b2, b1],
    );
  });
  it('preserves original order for equal items when sorting descending', () => {
    const a1 = { x: 'a', index: 1 };
    const a2 = { x: 'a', index: 2 };
    const b1 = { x: 'b', index: 1 };
    const b2 = { x: 'b', index: 2 };
    deepStrictEqual(
      sort([a1, b1, a2, b2], (val) => val.x, 'desc'),
      [b1, b2, a1, a2],
    );
    deepStrictEqual(
      sort([a2, b1, a1, b2], (val) => val.x, 'desc'),
      [b1, b2, a2, a1],
    );
    deepStrictEqual(
      sort([b2, b1, a1, a2], (val) => val.x, 'desc'),
      [b2, b1, a1, a2],
    );
  });
  it('does not mutate the original array', () => {
    const array = ['1', '10', '0', '20'];
    sort(array, (val) => parseFloat(val), 'asc');
    deepStrictEqual(array, ['1', '10', '0', '20']);
  });
  it('returns the original array instance if already in ascending order', () => {
    const array = ['0', '1', '10', '20'];
    strictEqual(
      sort(array, (val) => parseFloat(val), 'asc'),
      array,
    );
    strictEqual(
      sort(array, (val) => parseFloat(val), 'asc', -1),
      array,
    );
  });
  it('returns the original array instance if already in descending order', () => {
    const array = ['20', '10', '1', '0'];
    strictEqual(
      sort(array, (val) => parseFloat(val), 'desc'),
      array,
    );
    strictEqual(
      sort(array, (val) => parseFloat(val), 'desc', 21),
      array,
    );
  });
  it('returns another instance with since even if already in ascending order', () => {
    const array = ['0', '1', '10', '20'];
    notStrictEqual(
      sort(array, (val) => parseFloat(val), 'asc', 0),
      array,
    );
  });
  it('returns another instance with since even if already in descending order', () => {
    const array = ['20', '10', '1', '0'];
    notStrictEqual(
      sort(array, (val) => parseFloat(val), 'desc', 20),
      array,
    );
  });
  it('returns the original array instance if already in ascending order with equal items', () => {
    const a1 = { x: 'a' };
    const a2 = { x: 'a' };
    const b1 = { x: 'b' };
    const b2 = { x: 'b' };
    const array1 = [a2, a1, b1, b2];
    const array2 = [a1, a2, b2, b1];
    strictEqual(
      sort(array1, (val) => val.x, 'asc'),
      array1,
    );
    strictEqual(
      sort(array2, (val) => val.x, 'asc'),
      array2,
    );
  });
  it('returns the original array instance if already in descending order with equal items', () => {
    const a1 = { x: 'a' };
    const a2 = { x: 'a' };
    const b1 = { x: 'b' };
    const b2 = { x: 'b' };
    const array1 = [b1, b2, a2, a1];
    const array2 = [b2, b1, a1, a2];
    strictEqual(
      sort(array1, (val) => val.x, 'desc'),
      array1,
    );
    strictEqual(
      sort(array2, (val) => val.x, 'desc'),
      array2,
    );
  });
  it('returns the original array if empty', () => {
    const array: number[] = [];
    strictEqual(
      sort(array, (value) => value),
      array,
    );
    strictEqual(
      sort(array, (value) => value, 'asc'),
      array,
    );
    strictEqual(
      sort(array, (value) => value, 'desc'),
      array,
    );
  });
  it('returns the empty singleton array if filtered out everything', () => {
    strictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'asc', 20),
      empty,
    );
    strictEqual(
      sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'desc', 0),
      empty,
    );
  });
  it('supports recursive sorting', () => {
    const items = [{ values: [1, 10, 2] }, { values: [13, 2, 7] }, { values: [0, 3, 9] }];
    const expected = [{ values: [0, 3, 9] }, { values: [1, 10, 2] }, { values: [13, 2, 7] }];
    deepStrictEqual(
      sort(items, (item) => sort(item.values, (x) => x, 'desc')[0], 'asc'),
      expected,
    );
  });
});
