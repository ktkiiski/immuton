import findOrderedIndex from '../src/findOrderedIndex.js';

describe('orderedIndex()', () => {
  it('inserts smallest item to the first index when ascending', () => {
    expect(findOrderedIndex([{ foo: 1 }, { foo: 2 }, { foo: 3 }], { foo: 0 }, 'foo', 'asc')).toBe(0);
  });
  it('inserts largest item to the last index when ascending', () => {
    expect(findOrderedIndex([{ foo: 1 }, { foo: 2 }, { foo: 3 }], { foo: 4 }, 'foo', 'asc')).toBe(3);
  });
  it('inserts smallest item to the last index when descending', () => {
    expect(findOrderedIndex([{ foo: 3 }, { foo: 2 }, { foo: 1 }], { foo: 0 }, 'foo', 'desc')).toBe(3);
  });
  it('inserts largest item to the first index when descending', () => {
    expect(findOrderedIndex([{ foo: 3 }, { foo: 2 }, { foo: 1 }], { foo: 4 }, 'foo', 'desc')).toBe(0);
  });
  it('inserts intermediate value to the correct index', () => {
    expect(findOrderedIndex([{ foo: 1 }, { foo: 3 }], { foo: 2 }, 'foo', 'asc')).toBe(1);
    expect(findOrderedIndex([{ foo: 3 }, { foo: 1 }], { foo: 2 }, 'foo', 'desc')).toBe(1);
  });
  it('inserts equal value after existing ones', () => {
    expect(findOrderedIndex([{ foo: 1 }, { foo: 2 }], { foo: 1 }, 'foo', 'asc')).toBe(1);
    expect(findOrderedIndex([{ foo: 2 }, { foo: 1 }], { foo: 2 }, 'foo', 'desc')).toBe(1);
  });
  it('inserts to an empty array', () => {
    expect(findOrderedIndex([], { foo: 2 }, 'foo', 'asc')).toBe(0);
    expect(findOrderedIndex([], { foo: 2 }, 'foo', 'desc')).toBe(0);
  });
});
