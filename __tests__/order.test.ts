import empty from '../empty';
import order from '../order';

describe('order()', () => {
  it('sorts values in ascending order', () => {
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc')).toEqual([
      { x: 0 },
      { x: 1 },
      { x: 10 },
      { x: 20 },
    ]);
    expect(order([{ x: 10 }, { x: 1 }, { x: 20 }, { x: 0 }], 'x', 'asc')).toEqual([
      { x: 0 },
      { x: 1 },
      { x: 10 },
      { x: 20 },
    ]);
  });
  it('sorts values in descending order', () => {
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc')).toEqual([
      { x: 20 },
      { x: 10 },
      { x: 1 },
      { x: 0 },
    ]);
    expect(order([{ x: 10 }, { x: 1 }, { x: 20 }, { x: 0 }], 'x', 'desc')).toEqual([
      { x: 20 },
      { x: 10 },
      { x: 1 },
      { x: 0 },
    ]);
  });
  it('filters values after the since parameter', () => {
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc', -1)).toEqual([
      { x: 0 },
      { x: 1 },
      { x: 10 },
      { x: 20 },
    ]);
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc', 0)).toEqual([{ x: 1 }, { x: 10 }, { x: 20 }]);
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc', 1)).toEqual([{ x: 10 }, { x: 20 }]);
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc', 10)).toEqual([{ x: 20 }]);
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc', 20)).toEqual([]);
  });
  it('filters values before the since parameter', () => {
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc', 21)).toEqual([
      { x: 20 },
      { x: 10 },
      { x: 1 },
      { x: 0 },
    ]);
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc', 20)).toEqual([{ x: 10 }, { x: 1 }, { x: 0 }]);
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc', 10)).toEqual([{ x: 1 }, { x: 0 }]);
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc', 1)).toEqual([{ x: 0 }]);
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc', 0)).toEqual([]);
  });
  it('preserves original order for equal items when sorting ascending', () => {
    const a1 = { foo: 'a' };
    const a2 = { foo: 'a' };
    const b1 = { foo: 'b' };
    const b2 = { foo: 'b' };
    expect(order([a2, b1, a1, b2], 'foo', 'asc')).toEqual([a2, a1, b1, b2]);
    expect(order([b2, b1, a1, a2], 'foo', 'asc')).toEqual([a1, a2, b2, b1]);
  });
  it('preserves original order for equal items when sorting descending', () => {
    const a1 = { foo: 'a' };
    const a2 = { foo: 'a' };
    const b1 = { foo: 'b' };
    const b2 = { foo: 'b' };
    expect(order([a2, b1, a1, b2], 'foo', 'desc')).toEqual([b1, b2, a2, a1]);
    expect(order([b2, b1, a1, a2], 'foo', 'desc')).toEqual([b2, b1, a1, a2]);
  });
  it('does not mutate the original array', () => {
    const array = [{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }];
    order(array, 'x', 'asc');
    expect(array).toEqual([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }]);
  });
  it('returns the original array instance if already in ascending order', () => {
    const array = [{ x: 0 }, { x: 1 }, { x: 10 }, { x: 20 }];
    expect(order(array, 'x', 'asc')).toBe(array);
    expect(order(array, 'x', 'asc', -1)).toBe(array);
  });
  it('returns the original array instance if already in descending order', () => {
    const array = [{ x: 20 }, { x: 10 }, { x: 1 }, { x: 0 }];
    expect(order(array, 'x', 'desc')).toBe(array);
    expect(order(array, 'x', 'desc', 21)).toBe(array);
  });
  it('returns another instance with since even if already in ascending order', () => {
    const array = [{ x: 0 }, { x: 1 }, { x: 10 }, { x: 20 }];
    expect(order(array, 'x', 'asc', 0)).not.toBe(array);
  });
  it('returns another instance with since even if already in descending order', () => {
    const array = [{ x: 20 }, { x: 10 }, { x: 1 }, { x: 0 }];
    expect(order(array, 'x', 'desc', 20)).not.toBe(array);
  });
  it('returns the original array instance if already in ascending order with equal items', () => {
    const a1 = { x: 'a' };
    const a2 = { x: 'a' };
    const b1 = { x: 'b' };
    const b2 = { x: 'b' };
    const array1 = [a2, a1, b1, b2];
    const array2 = [a1, a2, b2, b1];
    expect(order(array1, 'x', 'asc')).toBe(array1);
    expect(order(array2, 'x', 'asc')).toBe(array2);
  });
  it('returns the original array instance if already in descending order with equal items', () => {
    const a1 = { x: 'a' };
    const a2 = { x: 'a' };
    const b1 = { x: 'b' };
    const b2 = { x: 'b' };
    const array1 = [b1, b2, a2, a1];
    const array2 = [b2, b1, a1, a2];
    expect(order(array1, 'x', 'desc')).toBe(array1);
    expect(order(array2, 'x', 'desc')).toBe(array2);
  });
  it('returns the original array if empty', () => {
    const array: Array<{ x: number }> = [];
    expect(order(array, 'x', 'asc')).toBe(array);
    expect(order(array, 'x', 'desc')).toBe(array);
  });
  it('returns the empty singleton array if filtered out everything', () => {
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'asc', 20)).toBe(empty);
    expect(order([{ x: 1 }, { x: 10 }, { x: 0 }, { x: 20 }], 'x', 'desc', 0)).toBe(empty);
  });
});
