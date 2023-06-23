import { createAction as ngrxCreateAction, props, Action } from '@ngrx/store'

export const initAction = ngrxCreateAction(
  '[Employee form1] Init',
  (payload) => payload
)

export const destroyAction = ngrxCreateAction(
  '[Employee form1] Destroy',
  (payload) => payload
)

/**
 * The Button 54477 NGRX action
 */
export const button54477Action = ngrxCreateAction(
  '[Employee form1] Button 54477',
  (payload) => payload
)
/**
 * The Button 54477 success NGRX action
 */
export const button54477SuccessAction = ngrxCreateAction(
  '[Employee form1] Button 54477 Success',
  (payload) => payload
)
/**
 * The Button 54477 fail NGRX action
 */
export const button54477FailAction = ngrxCreateAction(
  '[Employee form1] Button 54477 Fail',
  (payload) => payload
)

/**
 * NGRX Action of the state initializer
 */
export const initStateAction = ngrxCreateAction(
  '[Employee form1] Init State',
  (payload) => payload
)
/**
 * NGRX Action of the state's value initializer
 */
export const initValueAction = ngrxCreateAction(
  '[Employee form1] Init Value',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `initValueAction` action
 */
export const initValueSuccessAction = ngrxCreateAction(
  '[Employee form1] Init Value Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `initValueAction` action
 */
export const initValueFailAction = ngrxCreateAction(
  '[Employee form1] Init Value Fail',
  (payload) => payload
)

/**
 * The Mask NGRX action
 */
export const maskAction = ngrxCreateAction(
  '[Employee form1] Mask Screen',
  (payload) => payload
)
/**
 * The UnMask NGRX action
 */
export const unmaskAction = ngrxCreateAction(
  '[Employee form1] UnMask Screen',
  (payload) => payload
)

/**
 * NGRX Action that updates a `caller` state value
 */
export const updateDataAction = ngrxCreateAction(
  '[Employee form1] Update Data',
  (payload) => payload
)

/**
 * The Refresh NGRX action
 */
export const refresh = ngrxCreateAction(
  '[Employee form1] Refresh Screen',
  (payload) => payload
)
/**
 * Share Widget Data in the State
 */
export const shareWidgetData = ngrxCreateAction(
  '[Employee form1] Share Widget Data',
  (id, value, widgetName, propertyName) => ({
    id,
    value,
    widgetName,
    propertyName,
  })
)
