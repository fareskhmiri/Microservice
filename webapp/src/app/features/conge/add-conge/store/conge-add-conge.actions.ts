import { createAction as ngrxCreateAction, props, Action } from '@ngrx/store'

export const initAction = ngrxCreateAction(
  '[Conge addConge] Init',
  (payload) => payload
)

export const destroyAction = ngrxCreateAction(
  '[Conge addConge] Destroy',
  (payload) => payload
)

/**
 * The Button 35872039101 NGRX action
 */
export const button35872039101Action = ngrxCreateAction(
  '[Conge addConge] Button 35872039101',
  (payload) => payload
)
/**
 * The Button 35872039101 success NGRX action
 */
export const button35872039101SuccessAction = ngrxCreateAction(
  '[Conge addConge] Button 35872039101 Success',
  (payload) => payload
)
/**
 * The Button 35872039101 fail NGRX action
 */
export const button35872039101FailAction = ngrxCreateAction(
  '[Conge addConge] Button 35872039101 Fail',
  (payload) => payload
)
/**
 * The Button 35872 NGRX action
 */
export const button35872Action = ngrxCreateAction(
  '[Conge addConge] Button 35872',
  (payload) => payload
)
/**
 * The Button 35872 success NGRX action
 */
export const button35872SuccessAction = ngrxCreateAction(
  '[Conge addConge] Button 35872 Success',
  (payload) => payload
)
/**
 * The Button 35872 fail NGRX action
 */
export const button35872FailAction = ngrxCreateAction(
  '[Conge addConge] Button 35872 Fail',
  (payload) => payload
)

/**
 * NGRX Action of the state initializer
 */
export const initStateAction = ngrxCreateAction(
  '[Conge addConge] Init State',
  (payload) => payload
)
/**
 * NGRX Action of the state's value initializer
 */
export const initValueAction = ngrxCreateAction(
  '[Conge addConge] Init Value',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `initValueAction` action
 */
export const initValueSuccessAction = ngrxCreateAction(
  '[Conge addConge] Init Value Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `initValueAction` action
 */
export const initValueFailAction = ngrxCreateAction(
  '[Conge addConge] Init Value Fail',
  (payload) => payload
)

/**
 * The Mask NGRX action
 */
export const maskAction = ngrxCreateAction(
  '[Conge addConge] Mask Screen',
  (payload) => payload
)
/**
 * The UnMask NGRX action
 */
export const unmaskAction = ngrxCreateAction(
  '[Conge addConge] UnMask Screen',
  (payload) => payload
)

/**
 * NGRX Action that updates a `caller` state value
 */
export const updateDataAction = ngrxCreateAction(
  '[Conge addConge] Update Data',
  (payload) => payload
)

/**
 * The Refresh NGRX action
 */
export const refresh = ngrxCreateAction(
  '[Conge addConge] Refresh Screen',
  (payload) => payload
)
/**
 * Share Widget Data in the State
 */
export const shareWidgetData = ngrxCreateAction(
  '[Conge addConge] Share Widget Data',
  (id, value, widgetName, propertyName) => ({
    id,
    value,
    widgetName,
    propertyName,
  })
)
