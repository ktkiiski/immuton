import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import empty from '../src/empty.js';
import union from '../src/union.js';

describe('union()', () => {
  it('flattens the arrays with unique primitive values', () => {
    deepStrictEqual(union([[1, 2, 3, 4, 5]]), [1, 2, 3, 4, 5]);
    deepStrictEqual(
      union([
        [1, 2, 3],
        [4, 5],
      ]),
      [1, 2, 3, 4, 5],
    );
    deepStrictEqual(union([[1], [2, 3], [4], [5]]), [1, 2, 3, 4, 5]);
    deepStrictEqual(union([[], [1], [], [2, 3], [], [4], [], [5], []]), [1, 2, 3, 4, 5]);
    deepStrictEqual(union([[1, 2, 3, 4, 5], []]), [1, 2, 3, 4, 5]);
    deepStrictEqual(union([[], [1, 2, 3, 4, 5]]), [1, 2, 3, 4, 5]);
    deepStrictEqual(union([[], [1, 2, 3, 4, 5], []]), [1, 2, 3, 4, 5]);
  });
  it('flattens the arrays with unique complex values', () => {
    deepStrictEqual(union<unknown>([[{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]]), [
      { a: 'A' },
      { b: 'B' },
      { c: 'C' },
      { d: 'D' },
      { e: 'E' },
    ]);
    deepStrictEqual(
      union<unknown>([
        [{ a: 'A' }, { b: 'B' }, { c: 'C' }],
        [{ d: 'D' }, { e: 'E' }],
      ]),
      [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }],
    );
    deepStrictEqual(union<unknown>([[{ a: 'A' }], [{ b: 'B' }, { c: 'C' }], [{ d: 'D' }], [{ e: 'E' }]]), [
      { a: 'A' },
      { b: 'B' },
      { c: 'C' },
      { d: 'D' },
      { e: 'E' },
    ]);
    deepStrictEqual(
      union<unknown>([[], [{ a: 'A' }], [], [{ b: 'B' }, { c: 'C' }], [], [{ d: 'D' }], [], [{ e: 'E' }], []]),
      [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }],
    );
    deepStrictEqual(union<unknown>([[{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }], []]), [
      { a: 'A' },
      { b: 'B' },
      { c: 'C' },
      { d: 'D' },
      { e: 'E' },
    ]);
    deepStrictEqual(union<unknown>([[], [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]]), [
      { a: 'A' },
      { b: 'B' },
      { c: 'C' },
      { d: 'D' },
      { e: 'E' },
    ]);
    deepStrictEqual(union<unknown>([[], [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }], []]), [
      { a: 'A' },
      { b: 'B' },
      { c: 'C' },
      { d: 'D' },
      { e: 'E' },
    ]);
  });
  it('returns an array with unique primitive values', () => {
    deepStrictEqual(union([[1, 2, 1, 3, 2, 4, 4, 5, 1]]), [1, 2, 3, 4, 5]);
    deepStrictEqual(
      union([
        [1, 2, 1, 3, 2],
        [4, 4, 1, 5],
      ]),
      [1, 2, 3, 4, 5],
    );
    deepStrictEqual(union([[1], [2, 3], [1, 2, 3, 4], [5, 5, 4, 3, 2, 1]]), [1, 2, 3, 4, 5]);
    deepStrictEqual(union([[], [1], [1], [2, 3], [], [4, 1], [5], [5], []]), [1, 2, 3, 4, 5]);
    deepStrictEqual(union([[], [1, 2, 1, 3, 2, 4, 4, 5, 1]]), [1, 2, 3, 4, 5]);
    deepStrictEqual(union([[1, 2, 1, 3, 2, 4, 4, 5, 1], []]), [1, 2, 3, 4, 5]);
  });
  it('returns an array with unique complex values', () => {
    deepStrictEqual(
      union<unknown>([
        [{ a: 'A' }, { b: 'B' }, { a: 'A' }, { c: 'C' }, { b: 'B' }, { d: 'D' }, { d: 'D' }, { e: 'E' }, { a: 'A' }],
      ]),
      [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }],
    );
    deepStrictEqual(
      union<unknown>([
        [{ a: 'A' }, { b: 'B' }, { a: 'A' }, { c: 'C' }, { b: 'B' }],
        [{ d: 'D' }, { d: 'D' }, { a: 'A' }, { e: 'E' }],
      ]),
      [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }],
    );
    deepStrictEqual(
      union<unknown>([
        [{ a: 'A' }],
        [{ b: 'B' }, { c: 'C' }],
        [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }],
        [{ e: 'E' }, { e: 'E' }, { d: 'D' }, { c: 'C' }, { b: 'B' }, { a: 'A' }],
      ]),
      [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }],
    );
    deepStrictEqual(
      union<unknown>([
        [],
        [{ a: 'A' }],
        [{ a: 'A' }],
        [{ b: 'B' }, { c: 'C' }],
        [],
        [{ d: 'D' }, { a: 'A' }],
        [{ e: 'E' }],
        [{ e: 'E' }],
        [],
      ]),
      [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }],
    );
    deepStrictEqual(
      union<unknown>([
        [],
        [{ a: 'A' }, { b: 'B' }, { a: 'A' }, { c: 'C' }, { b: 'B' }, { d: 'D' }, { d: 'D' }, { e: 'E' }, { a: 'A' }],
      ]),
      [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }],
    );
    deepStrictEqual(
      union<unknown>([
        [{ a: 'A' }, { b: 'B' }, { a: 'A' }, { c: 'C' }, { b: 'B' }, { d: 'D' }, { d: 'D' }, { e: 'E' }, { a: 'A' }],
        [],
      ]),
      [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }],
    );
  });
  it('returns another array instance with transformed values', () => {
    const array = [[1], [2, 3], [4, 1, 2], [], [5]];
    notStrictEqual(union(array), array);
  });
  it('does not mutate the original arrays', () => {
    const a = [1];
    const b = [2, 3];
    const c = [1, 2, 3];
    const d = [4, 5];
    const array = [a, b, c, d];
    union(array);
    deepStrictEqual(a, [1]);
    deepStrictEqual(b, [2, 3]);
    deepStrictEqual(c, [1, 2, 3]);
    deepStrictEqual(d, [4, 5]);
    deepStrictEqual(array, [a, b, c, d]);
  });
  it('returns the reference to the only non-empty array containing only unique values', () => {
    const nested = [1, 2, 3, 4];
    strictEqual(union([nested]), nested);
    strictEqual(union([nested, [], [], []]), nested);
    strictEqual(union([[], [], nested]), nested);
    strictEqual(union([[], nested, [], [], []]), nested);
  });
  it('does not return the reference to the only non-empty array if its values are not unique', () => {
    const nested = [1, 2, 2, 3, 4];
    notStrictEqual(union([nested]), nested);
    notStrictEqual(union([nested, [], [], []]), nested);
    notStrictEqual(union([[], [], nested]), nested);
    notStrictEqual(union([[], nested, [], [], []]), nested);
  });
  it('returns the original array if empty', () => {
    const array: number[][] = [];
    strictEqual(union(array), array);
  });
  it('returns the empty singleton array if all nested arrays are empty', () => {
    strictEqual(union([[], [], []]), empty);
  });
});
