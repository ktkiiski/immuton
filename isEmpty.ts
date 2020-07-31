import hasOwnProperty from './hasOwnProperty';
import { Empty } from './types';

function isEmpty(value: unknown[]): value is never[];
function isEmpty(value: { [key: string]: unknown }): value is Empty;
function isEmpty(value: unknown[] | { [key: string]: unknown } | Empty): boolean;
function isEmpty(value: unknown[] | { [key: string]: unknown } | Empty): boolean {
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in value) {
    if (hasOwnProperty(value, prop)) {
      return false;
    }
  }
  return true;
}

export default isEmpty;
