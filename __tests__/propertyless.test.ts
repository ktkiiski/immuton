import propertyless from '../propertyless';
import { Propertyless } from '../types';

describe('propertyless singleton', () => {
  it('is an object without own enumerable properties', () => {
    expect(typeof propertyless).toBe('object');
    expect(Object.keys(propertyless)).toStrictEqual([]);
  });
  it('is frozen', () => {
    expect(Object.isFrozen(propertyless)).toBe(true);
    const obj: Propertyless = propertyless;
    expect(() => {
      (obj as Record<string, unknown>).foo = 'bar';
    }).toThrow();
  });
});
