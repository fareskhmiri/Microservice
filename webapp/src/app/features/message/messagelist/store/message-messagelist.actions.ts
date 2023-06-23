import { createAction as ngrxCreateAction, props, Action } from '@ngrx/store'

export const initAction = ngrxCreateAction(
  '[Message messagelist] Init',
  (payload) => payload
)

export const destroyAction = ngrxCreateAction(
  '[Message messagelist] Destroy',
  (payload) => payload
)

/**
 * The Button 91271 NGRX action
 */
export const button91271Action = ngrxCreateAction(
  '[Message messagelist] Button 91271',
  (payload) => payload
)
/**
 * The Button 01644 NGRX action
 */
export const button01644Action = ngrxCreateAction(
  '[Message messagelist] Button 01644',
  (payload) => payload
)
/**
 * The Button 03772 NGRX action
 */
export const button03772Action = ngrxCreateAction(
  '[Message messagelist] Button 03772',
  (payload) => payload
)

/**
 * The Refresh NGRX action
 */
export const refresh = ngrxCreateAction(
  '[Message messagelist] Refresh Screen',
  (payload) => payload
)
/**
 * The Mask NGRX action
 */
export const maskAction = ngrxCreateAction(
  '[Message messagelist] Mask Screen',
  (payload) => payload
)
/**
 * The UnMask NGRX action
 */
export const unmaskAction = ngrxCreateAction(
  '[Message messagelist] UnMask Screen',
  (payload) => payload
)
/**
 * NGRX Action of the search result count
 */
export const countAction = ngrxCreateAction(
  '[Message messagelist] Count',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `countAction` action
 */
export const countSuccessAction = ngrxCreateAction(
  '[Message messagelist] Count Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `countAction` action
 */
export const countFailAction = ngrxCreateAction(
  '[Message messagelist] Count Fail',
  (payload) => payload
)
/**
 * NGRX Action of the search result action
 */
export const searchAction = ngrxCreateAction(
  '[Message messagelist] Search',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `searchAction` action
 */
export const searchSuccessAction = ngrxCreateAction(
  '[Message messagelist] Search Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `searchAction` action
 */
export const searchFailAction = ngrxCreateAction(
  '[Message messagelist] Search Fail',
  (payload) => payload
)
/**
 * NGRX Action to store a relation item client-side
 */
export const rowsSelectionChangeAction = ngrxCreateAction(
  '[Message messagelist] Rows Selection Change',
  (payload) => payload
)
/**
 * NGRX Action that updates the search value
 */
export const updateDataAction = ngrxCreateAction(
  '[Message messagelist] Update Data',
  (payload) => payload
)
