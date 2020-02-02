/* eslint-disable no-restricted-syntax */
import isEqual from './isEqual';
import hasOwnProperty from './hasOwnProperty';
import propertyless from './propertyless';

/**
 * Determines which properties at the 2nd parameter has different values than the 1st parameter,
 * and returns an object with those properties. By default this performs a deep equality comparison
 * for each property value. You may optionally provide the depth parameter to limit the recursive
 * equality check, 0 meaning just using strict equality check.
 * @param oldObj the old state of an object
 * @param newObj the new state of an object
 * @param depth equality check depth
 */
function diff<T>(
  oldObj: {[key: string]: T},
  newObj: {[key: string]: T},
  depth?: number,
): {[key: string]: T};
function diff<T>(oldObj: T, newObj: T, depth?: number): Partial<T>;
function diff<T>(oldObj: T, newObj: T, depth?: number): Partial<T> {
  let result: any;
  let allDifferent = true;
  for (const key in newObj) {
    if (hasOwnProperty(newObj, key)) {
      const value = newObj[key];
      if (!isEqual(value, oldObj[key], depth)) {
        result = result || {};
        result[key] = value;
      } else {
        allDifferent = false;
      }
    }
  }
  if (!result) {
    return propertyless;
  }
  return allDifferent ? newObj : result;
}

export default diff;
