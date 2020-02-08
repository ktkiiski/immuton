import filter from './filter';
import includes from './includes';
import map from './map';

/**
 * Returns those items from the first given array that has no equal values
 * in the second array. The returned array may contain duplicates if the
 * original array also contains duplicates. If no values are filtered out,
 * then returns the original reference.
 */

function differenceBy<A, B>(a: A[], b: B[], iteratee: (item: A | B) => any): A[] {
  const exclusions = map(b, iteratee);
  return filter(a, (value) => !includes(exclusions, iteratee(value)));
}

export default differenceBy;
