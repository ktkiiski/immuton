import hasOwnProperty from './hasOwnProperty';

function isEmpty(value: any[]): value is never[];
function isEmpty(value: {[key: string]: any}): value is {};
function isEmpty(value: any[] | {[key: string]: any} | {}): boolean;
function isEmpty(value: any[] | {[key: string]: any} | {}): boolean {
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in value) {
    if (hasOwnProperty(value, prop)) {
      return false;
    }
  }
  return true;
}

export default isEmpty;
