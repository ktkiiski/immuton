export default function group<K extends keyof any, T>(
  values: T[], selector: (item: T, index: number) => K,
): {[P in K]: T[]} {
  const results: any = {};
  values.forEach((value, index) => {
    const key = selector(value, index);
    // eslint-disable-next-line no-multi-assign
    const acc = results[key] = results[key] || [] as T[];
    acc.push(value);
  });
  return results;
}
