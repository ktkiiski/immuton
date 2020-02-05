import findLastIndex from '../findLastIndex';

describe('findLastIndex', () => {
  it('returns the index of a matching item', () => {
    expect(findLastIndex(['a', 'b', 'c'], (x) => x === 'b')).toBe(1);
  });
  it('returns the index of a last matching item', () => {
    expect(findLastIndex(['a', 'b', 'b', 'c'], (x) => x === 'b')).toBe(2);
  });
  it('returns -1 if no matching item is found', () => {
    expect(findLastIndex(['a', 'b', 'c'], (x) => x === 'd')).toBe(-1);
  });
  it('returns -1 for an empty array', () => {
    expect(findLastIndex([], (x) => x === 'x')).toBe(-1);
  });
});
