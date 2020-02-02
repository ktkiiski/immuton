/* eslint-disable no-restricted-syntax */
import { FilteredValues } from './types';
import hasOwnProperty from './hasOwnProperty';
import propertyless from './propertyless';

/**
 * Pick all the property names from the given object matching the criteria.
 * If every object property matches the criteria, then the object reference is returned.
 * @param obj object whose properties to pick
 * @param fn function returning whether or not a property should be selected
 */
function select<T, V extends T[keyof T]>(
  obj: T, fn: (key: keyof T, value: T[keyof T]) => value is V
): FilteredValues<T, V>;
function select<T, K extends keyof T>(
  obj: T, fn: (key: keyof T, val: T[keyof T]) => key is K
): Pick<T, K>;
function select<T>(obj: T, fn: (key: keyof T, value: T[keyof T]) => boolean): Partial<T>;
function select<T>(obj: T, fn: (key: keyof T, value: T[keyof T]) => boolean): Partial<T> {
  let output: any;
  let pickEverything = true;
  for (const key in obj) {
    if (hasOwnProperty(obj, key)) {
      const value = obj[key];
      if (fn(key, value)) {
        output = output || {};
        output[key] = value;
      } else {
        pickEverything = false;
      }
    }
  }
  if (pickEverything) {
    return obj;
  }
  return output || propertyless;
}

export default select;
