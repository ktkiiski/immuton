import { deepStrictEqual, strictEqual } from 'assert';
import group from '../src/group.js';
import propertyless from '../src/propertyless.js';

describe('group()', () => {
  it('groups values with different selector results to different keys', () => {
    deepStrictEqual(
      group(
        [
          { id: 1, name: 'John' },
          { id: 2, name: 'Eric' },
          { id: 3, name: 'Bob' },
        ],
        (item) => item.name,
      ),
      {
        John: [{ id: 1, name: 'John' }],
        Eric: [{ id: 2, name: 'Eric' }],
        Bob: [{ id: 3, name: 'Bob' }],
      },
    );
  });
  it('group values with the same selector result to the same key', () => {
    deepStrictEqual(
      group(
        [
          { id: 1, name: 'John' },
          { id: 2, name: 'John' },
          { id: 3, name: 'John' },
        ],
        (item) => item.name,
      ),
      {
        John: [
          { id: 1, name: 'John' },
          { id: 2, name: 'John' },
          { id: 3, name: 'John' },
        ],
      },
    );
  });
  it('returns empty object singleton when given an empty array', () => {
    strictEqual(
      group([], () => 'foo'),
      propertyless,
    );
  });
});
