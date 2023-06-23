import { createAction as ngrxCreateAction, props, Action } from '@ngrx/store'

export const initAction = ngrxCreateAction(
  '[Conge listconge] Init',
  (payload) => payload
)

export const destroyAction = ngrxCreateAction(
  '[Conge listconge] Destroy',
  (payload) => payload
)

/**
 * The Edit NGRX action
 */
export const editAction = ngrxCreateAction(
  '[Conge listconge] Edit',
  (payload) => payload
)
/**
 * The Button 66719 NGRX action
 */
export const button66719Action = ngrxCreateAction(
  '[Conge listconge] Button 66719',
  (payload) => payload
)
/**
 * The Button 26614 NGRX action
 */
export const button26614Action = ngrxCreateAction(
  '[Conge listconge] Button 26614',
  (payload) => payload
)

/**
 * The Refresh NGRX action
 */
export const refresh = ngrxCreateAction(
  '[Conge listconge] Refresh Screen',
  (payload) => payload
)
/**
 * The Mask NGRX action
 */
export const maskAction = ngrxCreateAction(
  '[Conge listconge] Mask Screen',
  (payload) => payload
)
/**
 * The UnMask NGRX action
 */
export const unmaskAction = ngrxCreateAction(
  '[Conge listconge] UnMask Screen',
  (payload) => payload
)
/**
 * NGRX Action of the search result count
 */
export const countAction = ngrxCreateAction(
  '[Conge listconge] Count',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `countAction` action
 */
export const countSuccessAction = ngrxCreateAction(
  '[Conge listconge] Count Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `countAction` action
 */
export const countFailAction = ngrxCreateAction(
  '[Conge listconge] Count Fail',
  (payload) => payload
)
/**
 * NGRX Action of the search result action
 */
export const searchAction = ngrxCreateAction(
  '[Conge listconge] Search',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `searchAction` action
 */
export const searchSuccessAction = ngrxCreateAction(
  '[Conge listconge] Search Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `searchAction` action
 */
export const searchFailAction = ngrxCreateAction(
  '[Conge listconge] Search Fail',
  (payload) => payload
)
/**
 * NGRX Action to store a relation item client-side
 */
export const rowsSelectionChangeAction = ngrxCreateAction(
  '[Conge listconge] Rows Selection Change',
  (payload) => payload
)
/**
 * NGRX Action that updates the search value
 */
export const updateDataAction = ngrxCreateAction(
  '[Conge listconge] Update Data',
  (payload) => payload
)
