import group from '../group';
import propertyless from '../propertyless';

describe('group()', () => {
  it('groups values with different selector results to different keys', () => {
    expect(
      group(
        [
          { id: 1, name: 'John' },
          { id: 2, name: 'Eric' },
          { id: 3, name: 'Bob' },
        ],
        (item) => item.name,
      ),
    ).toEqual({
      John: [{ id: 1, name: 'John' }],
      Eric: [{ id: 2, name: 'Eric' }],
      Bob: [{ id: 3, name: 'Bob' }],
    });
  });
  it('group values with the same selector result to the same key', () => {
    expect(
      group(
        [
          { id: 1, name: 'John' },
          { id: 2, name: 'John' },
          { id: 3, name: 'John' },
        ],
        (item) => item.name,
      ),
    ).toEqual({
      John: [
        { id: 1, name: 'John' },
        { id: 2, name: 'John' },
        { id: 3, name: 'John' },
      ],
    });
  });
  it('returns empty object singleton when given an empty array', () => {
    expect(group([], () => 'foo')).toBe(propertyless);
  });
});
