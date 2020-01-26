export default function hasOwnProperty<T>(
  obj: T, propName: string | number | symbol,
): propName is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, propName);
}
