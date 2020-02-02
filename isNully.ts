export default function isNully(value: any): value is null | undefined {
  return value == null;
}
