import empty from './empty';

/**
 * Transforms every value in the array using the given function
 * and returns an array with the transformed values. If every
 * transformed value are the same than the original values, or
 * if the original array is empty, the original array instance is
 * returned instead of a new reference.
 * @param array array of items to transform
 * @param fn function used to transform each item
 */
function map<T, U>(array: T[], fn: (value: T, index: number, array: T[]) => U): U[] {
  let altered = false;
  const result = array.map((value, index, arr) => {
    const transformed = fn(value, index, arr);
    if (!Object.is(transformed, value)) {
      altered = true;
    }
    return transformed;
  });
  if (!altered) {
    return array as unknown[] as U[];
  }
  return result.length ? result : empty;
}

export default map;
