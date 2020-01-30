/* eslint-disable no-restricted-syntax */
import hasOwnProperty from './hasOwnProperty';

/**
 * Maps each value for each property of an object to a new value,
 * as returned by the given function that is called for each property.
 * If no property is changed, then the original object reference is returned.
 * @param obj object whose values are mapped
 * @param iterator function that returns new value for each key
 */
function transform<T, R>(
  obj: T, iterator: (value: T[keyof T], key: keyof T) => R,
): {[P in keyof T]: R} {
  let result: {[P in keyof T]: R} | undefined;
  for (const key in obj) {
    if (hasOwnProperty(obj, key)) {
      const value = obj[key];
      const newValue = iterator(value, key);
      if (!Object.is(value, newValue)) {
        if (result == null) {
          result = {} as {[P in keyof T]: R};
        }
        result[key] = newValue;
      }
    }
  }
  return result || obj as unknown as {[P in keyof T]: R};
}

export default transform;
