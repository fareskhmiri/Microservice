import { pipe, Observable } from 'rxjs';
import { skip, filter, distinctUntilChanged, withLatestFrom, startWith, pairwise, map, takeUntil, first } from 'rxjs/operators';
import { isEqual, pickBy, get, set } from 'lodash';
import { select } from '@ngrx/store';

import { selectWidgetData, possibleValues, selectValue, selectProperty, selectValueState, selectPropertyValue, selectRoleNameValue } from '@app/core/store/selectors';
/**
 * Custom pure functions to be used as custom operators
 */
/**
 * This operator checks the distinct values of any kind of object
 */
export const distinctUntilBeChanged = pipe(filter(Boolean), distinctUntilChanged(isEqual));
/**
 * This operator selects the possible values of a field from ngrx state
 * @param ctx
 * @param field
 */
export const selectPossibleValues = (ctx: any, field: string) =>
  pipe(
    select(possibleValues, {
      ...ctx,
      field
    }),
    distinctUntilBeChanged
  );
/**
 *
 * This operator selects the value of a screen from ngrx state
 *
 */
export const selectData = (ctx: any) =>
  pipe(
    select(selectValue, { ...ctx }),
    filter((value) => value !== undefined && !(value instanceof Array))
  );

/**
 *
 * This operator selects the form value of a screen from ngrx state if not updated
 * by a child component
 *
 */
 export const selectFormData = (ctx: any) =>
 pipe(
   select(selectValueState, { ...ctx }),
   distinctUntilBeChanged,
   filter((value:any) => !value.updatedByChildren),
   transformFormData(),
 )
 /**
 *
 * This operator selects the form value of a screen if it is updated by one child component
 *
 */
  export const selectDataUpdatedByChildren = (ctx: any) =>
  pipe(
    select(selectValueState, { ...ctx }),
    distinctUntilBeChanged,
    filter((value:any) => value.updatedByChildren === true),
    map(data => ({...data, propertyToModify: data.propertyToModify, value: get(data.value, data.propertyToModify, {})}))
  )
 /**
  * Transforms the data stream
  * @returns
  */
 export const transformFormData = () =>
 pipe(
   map((value:any) => value.value),
   filter(value => value !== undefined && !(value instanceof Array)),
   startWith({}),
   pairwise(),
   map(([oldValue, newValue]) => {
     return oldValue
       ? pickBy(newValue, (value, key) => {
           return !isEqual(value, oldValue[key]) || oldValue !== newValue
         })
       : newValue
   })
 )
 /**
 * This operator selects the modified property of a screen from ngrx state
 * @param ctx
 * @param property
 * @param data$
 */

export const selectPropertyToModify = (ctx: object, property: string, data$: Observable<any>) =>
  pipe(select(selectProperty, { ...ctx, property: 'propertyToModify' }),
    filter(data => data === property),
    withLatestFrom(data$))
/**
 * This operator checks the emitted query parameter `reload`
 * to recall the sub routes
 */
export const selectReloadParameter = (destroy$) => pipe(filter((item: any) => item.reload), takeUntil(destroy$));
/**
 *
 * This operator selects a data from a widget state
 *
 */
 export const selectWidgetProperty = (ctx: any) =>
 pipe(
   select(selectWidgetData, { ...ctx }),
   filter((value:any) => value !== undefined),
   distinctUntilBeChanged,
 )
 /**
 *
 * This operator selects the changed data for a given property name store in the state
 * The skip(1) is used to ignore the first value stored, we need to notify the subscribers by the future changes
 *
 */
  export const selectChangedDataProperty = (context: any) =>
  pipe(
    select(selectPropertyValue, { ...context }),
    skip(1),
    distinctUntilChanged(isEqual),
  )
 /**
 * This operator listens to the 'displayScreen' property modified by a wizard screen
 * to get the notification if the screen is displayed or not
 * @param ctx
 */
export const selectDisplayProperty = (ctx: object) =>
pipe(
  select(selectProperty, { ...ctx, property: 'displayScreen' }),
  filter(Boolean),
  distinctUntilBeChanged
)
/**
 * This operator listens to the changes on the provided property
 * @param ctx
 * @param property
 */
 export const selectDataProperty = (ctx: object, property: string) =>
 pipe(
   select(selectProperty, { ...ctx, property }),
   distinctUntilBeChanged
 )
 