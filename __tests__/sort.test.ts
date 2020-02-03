import sort from '../sort';

describe('sort()', () => {
  it('sorts values in ascending order by default', () => {
    expect(sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'asc')).toEqual(['0', '1', '10', '20']);
    expect(sort(['10', '1', '20', '0'], (val) => parseFloat(val), 'asc')).toEqual(['0', '1', '10', '20']);
  });
  it('sorts values in ascending order', () => {
    expect(sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'asc')).toEqual(['0', '1', '10', '20']);
    expect(sort(['10', '1', '20', '0'], (val) => parseFloat(val), 'asc')).toEqual(['0', '1', '10', '20']);
  });
  it('sorts values in descending order', () => {
    expect(sort(['1', '10', '0', '20'], (val) => parseFloat(val), 'desc')).toEqual(['20', '10', '1', '0']);
    expect(sort(['10', '1', '20', '0'], (val) => parseFloat(val), 'desc')).toEqual(['20', '10', '1', '0']);
  });
  it('preserves original order for equal items when sorting ascending', () => {
    const a1 = { x: 'a' };
    const a2 = { x: 'a' };
    const b1 = { x: 'b' };
    const b2 = { x: 'b' };
    expect(sort([a2, b1, a1, b2], (val) => val.x, 'asc')).toEqual([a2, a1, b1, b2]);
    expect(sort([b2, b1, a1, a2], (val) => val.x, 'asc')).toEqual([a1, a2, b2, b1]);
  });
  it('preserves original order for equal items when sorting descending', () => {
    const a1 = { x: 'a' };
    const a2 = { x: 'a' };
    const b1 = { x: 'b' };
    const b2 = { x: 'b' };
    expect(sort([a2, b1, a1, b2], (val) => val.x, 'desc')).toEqual([b1, b2, a2, a1]);
    expect(sort([b2, b1, a1, a2], (val) => val.x, 'desc')).toEqual([b2, b1, a1, a2]);
  });
  it('does not mutate the original array', () => {
    const array = ['1', '10', '0', '20'];
    sort(array, (val) => parseFloat(val), 'asc');
    expect(array).toEqual(['1', '10', '0', '20']);
  });
  it('returns the original array instance if already in ascending order', () => {
    const array = ['0', '1', '10', '20'];
    expect(sort(array, (val) => parseFloat(val), 'asc')).toBe(array);
  });
  it('returns the original array instance if already in descending order', () => {
    const array = ['20', '10', '1', '0'];
    expect(sort(array, (val) => parseFloat(val), 'desc')).toBe(array);
  });
  it('returns the original array instance if already in ascending order with equal items', () => {
    const a1 = { x: 'a' };
    const a2 = { x: 'a' };
    const b1 = { x: 'b' };
    const b2 = { x: 'b' };
    const array1 = [a2, a1, b1, b2];
    const array2 = [a1, a2, b2, b1];
    expect(sort(array1, (val) => val.x, 'asc')).toBe(array1);
    expect(sort(array2, (val) => val.x, 'asc')).toBe(array2);
  });
  it('returns the original array instance if already in descending order with equal items', () => {
    const a1 = { x: 'a' };
    const a2 = { x: 'a' };
    const b1 = { x: 'b' };
    const b2 = { x: 'b' };
    const array1 = [b1, b2, a2, a1];
    const array2 = [b2, b1, a1, a2];
    expect(sort(array1, (val) => val.x, 'desc')).toBe(array1);
    expect(sort(array2, (val) => val.x, 'desc')).toBe(array2);
  });
  it('returns the original array if empty', () => {
    const array: number[] = [];
    expect(sort(array, (value) => value)).toBe(array);
    expect(sort(array, (value) => value, 'asc')).toBe(array);
    expect(sort(array, (value) => value, 'desc')).toBe(array);
  });
});
