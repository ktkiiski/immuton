/**
 * Creates an object by mapping each item in the given array to pairs of keys and values.
 * The given iterator function is called for each item in the array and it should return
 * the key-value pair as a two-item array. If it returns undefined, then the item will
 * be omitted from the result object.
 */
export default function build<T, V, K extends string>(
  source: T[], iterator: (item: T, index: number) => [K, V] | void | undefined | null,
): {[P in K]: V} {
  const result = {} as {[P in K]: V};
  source.forEach((item, index) => {
    const pair = iterator(item, index);
    if (pair != null) {
      // eslint-disable-next-line prefer-destructuring
      result[pair[0]] = pair[1];
    }
  });
  return result;
}
