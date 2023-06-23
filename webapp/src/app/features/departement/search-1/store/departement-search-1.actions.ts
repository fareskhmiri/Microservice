import { createAction as ngrxCreateAction, props, Action } from '@ngrx/store'

export const initAction = ngrxCreateAction(
  '[Departement search1] Init',
  (payload) => payload
)

export const destroyAction = ngrxCreateAction(
  '[Departement search1] Destroy',
  (payload) => payload
)

/**
 * The Button 63307 NGRX action
 */
export const button63307Action = ngrxCreateAction(
  '[Departement search1] Button 63307',
  (payload) => payload
)

/**
 * The Refresh NGRX action
 */
export const refresh = ngrxCreateAction(
  '[Departement search1] Refresh Screen',
  (payload) => payload
)
/**
 * The Mask NGRX action
 */
export const maskAction = ngrxCreateAction(
  '[Departement search1] Mask Screen',
  (payload) => payload
)
/**
 * The UnMask NGRX action
 */
export const unmaskAction = ngrxCreateAction(
  '[Departement search1] UnMask Screen',
  (payload) => payload
)
/**
 * NGRX Action of the search result count
 */
export const countAction = ngrxCreateAction(
  '[Departement search1] Count',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `countAction` action
 */
export const countSuccessAction = ngrxCreateAction(
  '[Departement search1] Count Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `countAction` action
 */
export const countFailAction = ngrxCreateAction(
  '[Departement search1] Count Fail',
  (payload) => payload
)
/**
 * NGRX Action of the search result action
 */
export const searchAction = ngrxCreateAction(
  '[Departement search1] Search',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `searchAction` action
 */
export const searchSuccessAction = ngrxCreateAction(
  '[Departement search1] Search Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `searchAction` action
 */
export const searchFailAction = ngrxCreateAction(
  '[Departement search1] Search Fail',
  (payload) => payload
)
/**
 * NGRX Action to store a relation item client-side
 */
export const rowsSelectionChangeAction = ngrxCreateAction(
  '[Departement search1] Rows Selection Change',
  (payload) => payload
)
/**
 * NGRX Action that updates the search value
 */
export const updateDataAction = ngrxCreateAction(
  '[Departement search1] Update Data',
  (payload) => payload
)
