import { deepStrictEqual, notStrictEqual, strictEqual } from 'assert';
import empty from '../src/empty.js';
import order from '../src/order.js';

describe('order()', () => {
  it('sorts values in ascending order', () => {
    deepStrictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc'), [
      { x: 0 },
      { x: 1 },
      { x: 10 },
      { x: 20 },
    ]);
    deepStrictEqual(order([{ x: 10 }, { x: 1 }, { x: 20 }, { x: 0 }], 'x', 'asc'), [
      { x: 0 },
      { x: 1 },
      { x: 10 },
      { x: 20 },
    ]);
  });
  it('sorts values in descending order', () => {
    deepStrictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc'), [
      { x: 20 },
      { x: 10 },
      { x: 1 },
      { x: 0 },
    ]);
    deepStrictEqual(order([{ x: 10 }, { x: 1 }, { x: 20 }, { x: 0 }], 'x', 'desc'), [
      { x: 20 },
      { x: 10 },
      { x: 1 },
      { x: 0 },
    ]);
  });
  it('filters values after the since parameter', () => {
    deepStrictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc', -1), [
      { x: 0 },
      { x: 1 },
      { x: 10 },
      { x: 20 },
    ]);
    deepStrictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc', 0), [{ x: 1 }, { x: 10 }, { x: 20 }]);
    deepStrictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc', 1), [{ x: 10 }, { x: 20 }]);
    deepStrictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc', 10), [{ x: 20 }]);
    deepStrictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc', 20), []);
  });
  it('filters values before the since parameter', () => {
    deepStrictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc', 21), [
      { x: 20 },
      { x: 10 },
      { x: 1 },
      { x: 0 },
    ]);
    deepStrictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc', 20), [
      { x: 10 },
      { x: 1 },
      { x: 0 },
    ]);
    deepStrictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc', 10), [{ x: 1 }, { x: 0 }]);
    deepStrictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc', 1), [{ x: 0 }]);
    deepStrictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc', 0), []);
  });
  it('preserves original order for equal items when sorting ascending', () => {
    const a1 = { foo: 'a' };
    const a2 = { foo: 'a' };
    const b1 = { foo: 'b' };
    const b2 = { foo: 'b' };
    deepStrictEqual(order([a2, b1, a1, b2], 'foo', 'asc'), [a2, a1, b1, b2]);
    deepStrictEqual(order([b2, b1, a1, a2], 'foo', 'asc'), [a1, a2, b2, b1]);
  });
  it('preserves original order for equal items when sorting descending', () => {
    const a1 = { foo: 'a' };
    const a2 = { foo: 'a' };
    const b1 = { foo: 'b' };
    const b2 = { foo: 'b' };
    deepStrictEqual(order([a2, b1, a1, b2], 'foo', 'desc'), [b1, b2, a2, a1]);
    deepStrictEqual(order([b2, b1, a1, a2], 'foo', 'desc'), [b2, b1, a1, a2]);
  });
  it('does not mutate the original array', () => {
    const array = [{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }];
    order(array, 'x', 'asc');
    deepStrictEqual(array, [{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }]);
  });
  it('returns the original array instance if already in ascending order', () => {
    const array = [{ x: 0 }, { x: 1 }, { x: 10 }, { x: 20 }];
    strictEqual(order(array, 'x', 'asc'), array);
    strictEqual(order(array, 'x', 'asc', -1), array);
  });
  it('returns the original array instance if already in descending order', () => {
    const array = [{ x: 20 }, { x: 10 }, { x: 1 }, { x: 0 }];
    strictEqual(order(array, 'x', 'desc'), array);
    strictEqual(order(array, 'x', 'desc', 21), array);
  });
  it('returns another instance with since even if already in ascending order', () => {
    const array = [{ x: 0 }, { x: 1 }, { x: 10 }, { x: 20 }];
    notStrictEqual(order(array, 'x', 'asc', 0), array);
  });
  it('returns another instance with since even if already in descending order', () => {
    const array = [{ x: 20 }, { x: 10 }, { x: 1 }, { x: 0 }];
    notStrictEqual(order(array, 'x', 'desc', 20), array);
  });
  it('returns the original array instance if already in ascending order with equal items', () => {
    const a1 = { x: 'a' };
    const a2 = { x: 'a' };
    const b1 = { x: 'b' };
    const b2 = { x: 'b' };
    const array1 = [a2, a1, b1, b2];
    const array2 = [a1, a2, b2, b1];
    strictEqual(order(array1, 'x', 'asc'), array1);
    strictEqual(order(array2, 'x', 'asc'), array2);
  });
  it('returns the original array instance if already in descending order with equal items', () => {
    const a1 = { x: 'a' };
    const a2 = { x: 'a' };
    const b1 = { x: 'b' };
    const b2 = { x: 'b' };
    const array1 = [b1, b2, a2, a1];
    const array2 = [b2, b1, a1, a2];
    strictEqual(order(array1, 'x', 'desc'), array1);
    strictEqual(order(array2, 'x', 'desc'), array2);
  });
  it('returns the original array if empty', () => {
    const array: Array<{ x: number }> = [];
    strictEqual(order(array, 'x', 'asc'), array);
    strictEqual(order(array, 'x', 'desc'), array);
  });
  it('returns the empty singleton array if filtered out everything', () => {
    strictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc', 20), empty);
    strictEqual(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc', 0), empty);
  });
});
