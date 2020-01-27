/**
 * Returns a copy of the object with the given properties merged to it, overriding
 * any existing properties. If the object already has all those values, then returns
 * the original instance, otherwise a new reference is returned.
 * @param object object to copy and set
 * @param props properties to set
 */
function extend<T, S>(object: T, props: S): T & S {
  const newKeys = Object.keys(props) as Array<keyof S>;
  if (newKeys.every((prop) => prop in object && (object as any)[prop] === props[prop])) {
    // Object already has the properties
    return object as T & S;
  }
  const oldKeys = Object.keys(object);
  if (oldKeys.every((prop) => prop in props)) {
    // All the existing properties would be overridden
    return props as T & S;
  }
  return { ...object, ...props };
}

export default extend;
