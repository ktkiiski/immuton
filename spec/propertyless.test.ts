import { deepStrictEqual, strictEqual, throws } from 'assert';
import propertyless from '../src/propertyless.js';
import type { Propertyless } from '../src/types.js';

describe('propertyless singleton', () => {
  it('is an object without own enumerable properties', () => {
    strictEqual(typeof propertyless, 'object');
    deepStrictEqual(Object.keys(propertyless), []);
  });
  it('is frozen', () => {
    strictEqual(Object.isFrozen(propertyless), true);
    const obj: Propertyless = propertyless;
    throws(() => {
      (obj as Record<string, unknown>).foo = 'bar';
    });
  });
});
