import { createAction as ngrxCreateAction, props, Action } from '@ngrx/store'

export const initAction = ngrxCreateAction(
  '[Departement addDepartment] Init',
  (payload) => payload
)

export const destroyAction = ngrxCreateAction(
  '[Departement addDepartment] Destroy',
  (payload) => payload
)

/**
 * The Button 42178 NGRX action
 */
export const button42178Action = ngrxCreateAction(
  '[Departement addDepartment] Button 42178',
  (payload) => payload
)
/**
 * The Button 42178 success NGRX action
 */
export const button42178SuccessAction = ngrxCreateAction(
  '[Departement addDepartment] Button 42178 Success',
  (payload) => payload
)
/**
 * The Button 42178 fail NGRX action
 */
export const button42178FailAction = ngrxCreateAction(
  '[Departement addDepartment] Button 42178 Fail',
  (payload) => payload
)

/**
 * NGRX Action of the state initializer
 */
export const initStateAction = ngrxCreateAction(
  '[Departement addDepartment] Init State',
  (payload) => payload
)
/**
 * NGRX Action of the state's value initializer
 */
export const initValueAction = ngrxCreateAction(
  '[Departement addDepartment] Init Value',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `initValueAction` action
 */
export const initValueSuccessAction = ngrxCreateAction(
  '[Departement addDepartment] Init Value Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `initValueAction` action
 */
export const initValueFailAction = ngrxCreateAction(
  '[Departement addDepartment] Init Value Fail',
  (payload) => payload
)

/**
 * The Mask NGRX action
 */
export const maskAction = ngrxCreateAction(
  '[Departement addDepartment] Mask Screen',
  (payload) => payload
)
/**
 * The UnMask NGRX action
 */
export const unmaskAction = ngrxCreateAction(
  '[Departement addDepartment] UnMask Screen',
  (payload) => payload
)

/**
 * NGRX Action that updates a `caller` state value
 */
export const updateDataAction = ngrxCreateAction(
  '[Departement addDepartment] Update Data',
  (payload) => payload
)

/**
 * The Refresh NGRX action
 */
export const refresh = ngrxCreateAction(
  '[Departement addDepartment] Refresh Screen',
  (payload) => payload
)
/**
 * Share Widget Data in the State
 */
export const shareWidgetData = ngrxCreateAction(
  '[Departement addDepartment] Share Widget Data',
  (id, value, widgetName, propertyName) => ({
    id,
    value,
    widgetName,
    propertyName,
  })
)
