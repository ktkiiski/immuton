import hasOwnProperty from './hasOwnProperty';

/* eslint-disable no-plusplus */
function isDeepEqual(
  a: any, b: any, depth = Number.POSITIVE_INFINITY, stack?: Array<[any, any]>,
): boolean {
  if (a === b) {
    return true;
  }
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
    // If both NaN, then return true, otherwise not equal
    // eslint-disable-next-line no-self-compare
    return a !== a && b !== b;
  }
  // Compare dates
  const dateA = a instanceof Date;
  const dateB = b instanceof Date;
  if (dateA !== dateB) {
    return false;
  }
  if (dateA && dateB) {
    return a.getTime() === b.getTime();
  }
  // Compare RegExps
  const regexpA = a instanceof RegExp;
  const regexpB = b instanceof RegExp;
  if (regexpA !== regexpB) {
    return false;
  }
  if (regexpA && regexpB) {
    return a.toString() === b.toString();
  }
  // Check recursively if depth > 0
  if (depth <= 0) {
    return false;
  }
  // Check if we are already comparing these objects in the stack
  if (stack) {
    if (stack.some(([x, y]) => x === a && y === b)) {
      return true;
    }
  }
  // Compare arrays
  const arrA = Array.isArray(a);
  const arrB = Array.isArray(b);
  if (arrA && arrB) {
    const { length } = a;
    if (length !== b.length) {
      return false;
    }
    for (let i = length; i-- !== 0;) {
      if (!isDeepEqual(a[i], b[i], depth - 1, stack)) {
        return false;
      }
    }
    return true;
  }
  if (arrA !== arrB) {
    return false;
  }
  // Compare objects
  const keyList = Object.keys(a);
  const keyCount = keyList.length;

  if (keyCount !== Object.keys(b).length) {
    return false;
  }
  for (let i = keyCount; i-- !== 0;) {
    if (!hasOwnProperty(b, keyList[i])) {
      return false;
    }
  }
  for (let i = keyCount; i-- !== 0;) {
    const key = keyList[i];
    // eslint-disable-next-line no-param-reassign
    stack = stack || [];
    stack.push([a, b]);
    if (!isDeepEqual(a[key], b[key], depth - 1, stack)) {
      return false;
    }
    stack.pop();
  }
  return true;
}

/**
 * Compares the two given values with deep comparison
 * and returns whether or not they are equal.
 *
 * @param a First value to compare
 * @param b Second value to compare
 */
function isEqual<T, S>(a: T, b: S, depth?: number): boolean;
function isEqual(a: any, b: any, depth = Number.POSITIVE_INFINITY): boolean {
  return isDeepEqual(a, b, depth);
}

export default isEqual;
