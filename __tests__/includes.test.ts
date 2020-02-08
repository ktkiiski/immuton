import includes from '../includes';

describe('includes()', () => {
  it('returns true if array contains null', () => {
    expect(includes(['foo', null, 1], null)).toBe(true);
  });
  it('returns true if array does not contain null', () => {
    expect(includes(['foo', undefined, 1], null)).toBe(false);
  });
  it('returns true if array contains undefined', () => {
    expect(includes(['foo', undefined, 1], undefined)).toBe(true);
  });
  it('returns true if array does not contain undefined', () => {
    expect(includes(['foo', null, 1], undefined)).toBe(false);
  });
  it('returns true if array contains string', () => {
    expect(includes(['foo', undefined, 1], 'foo')).toBe(true);
  });
  it('returns true if array does not contain string', () => {
    expect(includes(['bar', 'foobar', 1], 'foo')).toBe(false);
  });
  it('returns true if array contains number', () => {
    expect(includes(['foo', undefined, 1], 1)).toBe(true);
  });
  it('returns true if array does not contain number', () => {
    expect(includes(['bar', 'foobar', 1, 3], 0)).toBe(false);
  });
  it('returns true if array contains boolean', () => {
    expect(includes(['foo', true, 1], true)).toBe(true);
  });
  it('returns true if array does not contain boolean', () => {
    expect(includes(['foo', true, 1, 3], false)).toBe(false);
  });
  it('returns true if array contains date object', () => {
    expect(includes(['foo', new Date(1), 1], new Date(1))).toBe(true);
  });
  it('returns true if array does not contain date object', () => {
    expect(includes(['foo', new Date(2), 1, 3], new Date(1))).toBe(false);
  });
  it('returns true if array contains equal object', () => {
    expect(includes(['foo', { a: 'A', b: 'B' }, 1], { a: 'A', b: 'B' })).toBe(true);
  });
  it('returns true if array does not contain equal object', () => {
    expect(includes(['foo', { a: 'A' }, 1, 3], { a: 'A', b: 'B' })).toBe(false);
  });
});
