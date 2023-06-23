import { AbstractControl, FormGroup } from '@angular/forms';
import { get, isDate, mergeWith } from 'lodash';
/**
 * Get the value of a property from a data object then
 * format the result to a standard format (Date for example)
 * @param value
 * @returns {string}
 */
export function getValue(data: any, property: string, defaultValue: any = ''): any {
  const value = get(data, property, defaultValue);
  return !isDate(value) ? value : value.toISOString();
}
/**
 * Decode the provided value, it is maily used to decode the Query parameters
 * @param value
 * @returns {string}
 */
 export function getDecodedValue(value: any): any {
  return value ? decodeURIComponent(value): value;
}
/**
 * Get the param value of a the field provided from the active route
 * @param value
 * @returns {string}
 */
 export function getParamValue(activeRoute,fieldName){
  return activeRoute.snapshot.queryParams[fieldName] || activeRoute.snapshot.params[fieldName];
}
/**
 * Merge the provided data objects into one object
 * @param oldData
 * @param newData
 * @returns
 */
export function mergeObjects(oldData, newData) { 
  return mergeWith(
    { ...oldData },
    { ...newData },
    (target, source) =>
      source === null || source instanceof Array ? source : undefined
  )
}
/**
 * Get the Root FormGroup from the provided child control
 * @param control
 * @returns {AbstractControl}
 */
export function getRootFormGroup(control: AbstractControl): AbstractControl {
  let formGroup = control
  while (formGroup && !(formGroup instanceof FormGroup)) {
    formGroup = formGroup.parent as FormGroup
  }
  return formGroup
}
