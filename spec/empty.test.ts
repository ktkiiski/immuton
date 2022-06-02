import { strictEqual, throws } from 'assert';
import empty from '../src/empty.js';

describe('empty singleton', () => {
  it('is an empty array', () => {
    strictEqual(Array.isArray(empty), true);
    strictEqual(empty.length, 0);
    strictEqual(empty[0], undefined);
  });
  it('is frozen', () => {
    strictEqual(Object.isFrozen(empty), true);
    const array: unknown[] = empty;
    throws(() => array.push('hello'));
  });
});
