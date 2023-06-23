import { createAction as ngrxCreateAction, props, Action } from '@ngrx/store'

export const initAction = ngrxCreateAction(
  '[Employee search1] Init',
  (payload) => payload
)

export const destroyAction = ngrxCreateAction(
  '[Employee search1] Destroy',
  (payload) => payload
)

/**
 * The Button 04826 NGRX action
 */
export const button04826Action = ngrxCreateAction(
  '[Employee search1] Button 04826',
  (payload) => payload
)

/**
 * The Refresh NGRX action
 */
export const refresh = ngrxCreateAction(
  '[Employee search1] Refresh Screen',
  (payload) => payload
)
/**
 * The Mask NGRX action
 */
export const maskAction = ngrxCreateAction(
  '[Employee search1] Mask Screen',
  (payload) => payload
)
/**
 * The UnMask NGRX action
 */
export const unmaskAction = ngrxCreateAction(
  '[Employee search1] UnMask Screen',
  (payload) => payload
)
/**
 * NGRX Action of the search result count
 */
export const countAction = ngrxCreateAction(
  '[Employee search1] Count',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `countAction` action
 */
export const countSuccessAction = ngrxCreateAction(
  '[Employee search1] Count Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `countAction` action
 */
export const countFailAction = ngrxCreateAction(
  '[Employee search1] Count Fail',
  (payload) => payload
)
/**
 * NGRX Action of the search result action
 */
export const searchAction = ngrxCreateAction(
  '[Employee search1] Search',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `searchAction` action
 */
export const searchSuccessAction = ngrxCreateAction(
  '[Employee search1] Search Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `searchAction` action
 */
export const searchFailAction = ngrxCreateAction(
  '[Employee search1] Search Fail',
  (payload) => payload
)
/**
 * NGRX Action to store a relation item client-side
 */
export const rowsSelectionChangeAction = ngrxCreateAction(
  '[Employee search1] Rows Selection Change',
  (payload) => payload
)
/**
 * NGRX Action that updates the search value
 */
export const updateDataAction = ngrxCreateAction(
  '[Employee search1] Update Data',
  (payload) => payload
)
