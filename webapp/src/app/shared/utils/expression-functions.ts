import { get, isEmpty } from 'lodash';
export * from '../expression-custom-functions';
/**
 * The following methods can be used to control the behavior of some components via Expressions
 * In UI Studio you can use the following methods by writing fn.NAME_OF_THE_METHOD(value, param1, param2...)
 */
/**
 * Checks if the provided array's items contains the provided field (not empty)
 * @return {boolean}
 */
export function contains(value, field): boolean {
  return Array.isArray(value) ? value?.every((item) => get(item, field)) : false;
}
/**
 * Checks if the provided value is empty
 * @return {boolean}
 */
export function ifEmpty(value): boolean {
  if (typeof value === 'number' || typeof value === 'boolean') {
    return isEmpty(value.toString())
  } else {
    return isEmpty(value)
  }
}
/**
 * Checks if the provided value is not empty
 * @return {boolean}
 */
export function ifNotEmpty(value): boolean {
  return !isEmpty(value);
}
/**
 * Checks if the provided object is deeply empty
 */
export function ifDeeplyEmpty(value): boolean {
  return value && Object.values(value).every(val => {
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      return ifDeeplyEmpty(val);
    } else if (Array.isArray(val)) {
      return val.length === 0 || ifDeeplyEmpty(val);
    }
    return val === undefined || val === null || (typeof val === 'object' && Object.keys(val).length === 0);
  });
};
