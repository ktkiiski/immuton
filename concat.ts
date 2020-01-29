import flatten from './flatten';

/**
 * Concatenates the arrays given as the parameters.
 * If only one of the arrays is non-empty, then returns a reference to that array.
 * @param arrays arrays to concatenate
 */
export default function concat<T>(...arrays: T[][]): T[] {
  return flatten(arrays);
}
