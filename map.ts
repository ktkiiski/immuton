export default function map<T, U>(array: T[], fn: (value: T, index: number, array: T[]) => U): U[] {
  let altered = false;
  const result = array.map((value, index, arr) => {
    const transformed = fn(value, index, arr);
    if (!Object.is(transformed, value)) {
      altered = true;
    }
    return transformed;
  });
  return altered ? result : (array as unknown[] as U[]);
}
