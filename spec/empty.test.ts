import empty from '../src/empty.js';

describe('empty singleton', () => {
  it('is an empty array', () => {
    expect(Array.isArray(empty)).toBe(true);
    expect(empty.length).toBe(0);
    expect(empty[0]).toBeUndefined();
  });
  it('is frozen', () => {
    expect(Object.isFrozen(empty)).toBe(true);
    const array: unknown[] = empty;
    expect(() => array.push('hello')).toThrow();
  });
});
