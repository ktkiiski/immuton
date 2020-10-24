import empty from '../empty';
import union from '../union';

describe('union()', () => {
  it('flattens the arrays with unique primitive values', () => {
    expect(union([[1, 2, 3, 4, 5]])).toStrictEqual([1, 2, 3, 4, 5]);
    expect(
      union([
        [1, 2, 3],
        [4, 5],
      ]),
    ).toStrictEqual([1, 2, 3, 4, 5]);
    expect(union([[1], [2, 3], [4], [5]])).toStrictEqual([1, 2, 3, 4, 5]);
    expect(union([[], [1], [], [2, 3], [], [4], [], [5], []])).toStrictEqual([1, 2, 3, 4, 5]);
    expect(union([[1, 2, 3, 4, 5], []])).toStrictEqual([1, 2, 3, 4, 5]);
    expect(union([[], [1, 2, 3, 4, 5]])).toStrictEqual([1, 2, 3, 4, 5]);
    expect(union([[], [1, 2, 3, 4, 5], []])).toStrictEqual([1, 2, 3, 4, 5]);
  });
  it('flattens the arrays with unique complex values', () => {
    expect(
      union<unknown>([[{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]]),
    ).toStrictEqual([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]);
    expect(
      union<unknown>([
        [{ a: 'A' }, { b: 'B' }, { c: 'C' }],
        [{ d: 'D' }, { e: 'E' }],
      ]),
    ).toStrictEqual([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]);
    expect(
      union<unknown>([[{ a: 'A' }], [{ b: 'B' }, { c: 'C' }], [{ d: 'D' }], [{ e: 'E' }]]),
    ).toStrictEqual([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]);
    expect(
      union<unknown>([[], [{ a: 'A' }], [], [{ b: 'B' }, { c: 'C' }], [], [{ d: 'D' }], [], [{ e: 'E' }], []]),
    ).toStrictEqual([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]);
    expect(
      union<unknown>([[{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }], []]),
    ).toStrictEqual([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]);
    expect(
      union<unknown>([[], [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]]),
    ).toStrictEqual([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]);
    expect(
      union<unknown>([[], [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }], []]),
    ).toStrictEqual([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]);
  });
  it('returns an array with unique primitive values', () => {
    expect(union([[1, 2, 1, 3, 2, 4, 4, 5, 1]])).toStrictEqual([1, 2, 3, 4, 5]);
    expect(
      union([
        [1, 2, 1, 3, 2],
        [4, 4, 1, 5],
      ]),
    ).toStrictEqual([1, 2, 3, 4, 5]);
    expect(union([[1], [2, 3], [1, 2, 3, 4], [5, 5, 4, 3, 2, 1]])).toStrictEqual([1, 2, 3, 4, 5]);
    expect(union([[], [1], [1], [2, 3], [], [4, 1], [5], [5], []])).toStrictEqual([1, 2, 3, 4, 5]);
    expect(union([[], [1, 2, 1, 3, 2, 4, 4, 5, 1]])).toStrictEqual([1, 2, 3, 4, 5]);
    expect(union([[1, 2, 1, 3, 2, 4, 4, 5, 1], []])).toStrictEqual([1, 2, 3, 4, 5]);
  });
  it('returns an array with unique complex values', () => {
    expect(
      union<unknown>([
        [{ a: 'A' }, { b: 'B' }, { a: 'A' }, { c: 'C' }, { b: 'B' }, { d: 'D' }, { d: 'D' }, { e: 'E' }, { a: 'A' }],
      ]),
    ).toStrictEqual([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]);
    expect(
      union<unknown>([
        [{ a: 'A' }, { b: 'B' }, { a: 'A' }, { c: 'C' }, { b: 'B' }],
        [{ d: 'D' }, { d: 'D' }, { a: 'A' }, { e: 'E' }],
      ]),
    ).toStrictEqual([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]);
    expect(
      union<unknown>([
        [{ a: 'A' }],
        [{ b: 'B' }, { c: 'C' }],
        [{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }],
        [{ e: 'E' }, { e: 'E' }, { d: 'D' }, { c: 'C' }, { b: 'B' }, { a: 'A' }],
      ]),
    ).toStrictEqual([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]);
    expect(
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
    ).toStrictEqual([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]);
    expect(
      union<unknown>([
        [],
        [{ a: 'A' }, { b: 'B' }, { a: 'A' }, { c: 'C' }, { b: 'B' }, { d: 'D' }, { d: 'D' }, { e: 'E' }, { a: 'A' }],
      ]),
    ).toStrictEqual([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]);
    expect(
      union<unknown>([
        [{ a: 'A' }, { b: 'B' }, { a: 'A' }, { c: 'C' }, { b: 'B' }, { d: 'D' }, { d: 'D' }, { e: 'E' }, { a: 'A' }],
        [],
      ]),
    ).toStrictEqual([{ a: 'A' }, { b: 'B' }, { c: 'C' }, { d: 'D' }, { e: 'E' }]);
  });
  it('returns another array instance with transformed values', () => {
    const array = [[1], [2, 3], [4, 1, 2], [], [5]];
    expect(union(array)).not.toBe(array);
  });
  it('does not mutate the original arrays', () => {
    const a = [1];
    const b = [2, 3];
    const c = [1, 2, 3];
    const d = [4, 5];
    const array = [a, b, c, d];
    union(array);
    expect(a).toStrictEqual([1]);
    expect(b).toStrictEqual([2, 3]);
    expect(c).toStrictEqual([1, 2, 3]);
    expect(d).toStrictEqual([4, 5]);
    expect(array).toStrictEqual([a, b, c, d]);
  });
  it('returns the reference to the only non-empty array containing only unique values', () => {
    const nested = [1, 2, 3, 4];
    expect(union([nested])).toBe(nested);
    expect(union([nested, [], [], []])).toBe(nested);
    expect(union([[], [], nested])).toBe(nested);
    expect(union([[], nested, [], [], []])).toBe(nested);
  });
  it('does not return the reference to the only non-empty array if its values are not unique', () => {
    const nested = [1, 2, 2, 3, 4];
    expect(union([nested])).not.toBe(nested);
    expect(union([nested, [], [], []])).not.toBe(nested);
    expect(union([[], [], nested])).not.toBe(nested);
    expect(union([[], nested, [], [], []])).not.toBe(nested);
  });
  it('returns the original array if empty', () => {
    const array: number[][] = [];
    expect(union(array)).toBe(array);
  });
  it('returns the empty singleton array if all nested arrays are empty', () => {
    expect(union([[], [], []])).toBe(empty);
  });
});
