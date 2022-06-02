import { strictEqual } from 'assert';
import findOrderedIndex from '../src/findOrderedIndex.js';

describe('orderedIndex()', () => {
  it('inserts smallest item to the first index when ascending', () => {
    strictEqual(findOrderedIndex([{ foo: 1 }, { foo: 2 }, { foo: 3 }], { foo: 0 }, 'foo', 'asc'), 0);
  });
  it('inserts largest item to the last index when ascending', () => {
    strictEqual(findOrderedIndex([{ foo: 1 }, { foo: 2 }, { foo: 3 }], { foo: 4 }, 'foo', 'asc'), 3);
  });
  it('inserts smallest item to the last index when descending', () => {
    strictEqual(findOrderedIndex([{ foo: 3 }, { foo: 2 }, { foo: 1 }], { foo: 0 }, 'foo', 'desc'), 3);
  });
  it('inserts largest item to the first index when descending', () => {
    strictEqual(findOrderedIndex([{ foo: 3 }, { foo: 2 }, { foo: 1 }], { foo: 4 }, 'foo', 'desc'), 0);
  });
  it('inserts intermediate value to the correct index', () => {
    strictEqual(findOrderedIndex([{ foo: 1 }, { foo: 3 }], { foo: 2 }, 'foo', 'asc'), 1);
    strictEqual(findOrderedIndex([{ foo: 3 }, { foo: 1 }], { foo: 2 }, 'foo', 'desc'), 1);
  });
  it('inserts equal value after existing ones', () => {
    strictEqual(findOrderedIndex([{ foo: 1 }, { foo: 2 }], { foo: 1 }, 'foo', 'asc'), 1);
    strictEqual(findOrderedIndex([{ foo: 2 }, { foo: 1 }], { foo: 2 }, 'foo', 'desc'), 1);
  });
  it('inserts to an empty array', () => {
    strictEqual(findOrderedIndex([], { foo: 2 }, 'foo', 'asc'), 0);
    strictEqual(findOrderedIndex([], { foo: 2 }, 'foo', 'desc'), 0);
  });
});
