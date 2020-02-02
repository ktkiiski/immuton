/* eslint-disable no-restricted-syntax */
/**
 * Returns a copy of the object that only contains the given property names, if present.
 * If the object has no other properties, then the original reference is returned.
 * @param obj object whose properties to pick
 * @param props property names to pick
 */
export default function pick<T, K extends keyof T>(obj: T, props: K[]): Pick<T, K> {
  for (const key in obj) {
    if ((props as Array<keyof T>).indexOf(key) < 0) {
      // At least one property will be omitted
      const output = {} as Pick<T, K>;
      props.forEach((propName) => {
        output[propName] = obj[propName];
      });
      return output;
    }
  }
  return obj as Pick<T, K>;
}
