import { createAction as ngrxCreateAction, props, Action } from '@ngrx/store'

export const initAction = ngrxCreateAction(
  '[Message form1] Init',
  (payload) => payload
)

export const destroyAction = ngrxCreateAction(
  '[Message form1] Destroy',
  (payload) => payload
)

/**
 * The Send 058028 NGRX action
 */
export const send058028Action = ngrxCreateAction(
  '[Message form1] Send 058028',
  (payload) => payload
)
/**
 * The Send 058028 success NGRX action
 */
export const send058028SuccessAction = ngrxCreateAction(
  '[Message form1] Send 058028 Success',
  (payload) => payload
)
/**
 * The Send 058028 fail NGRX action
 */
export const send058028FailAction = ngrxCreateAction(
  '[Message form1] Send 058028 Fail',
  (payload) => payload
)
/**
 * The Send NGRX action
 */
export const sendAction = ngrxCreateAction(
  '[Message form1] Send',
  (payload) => payload
)
/**
 * The Send success NGRX action
 */
export const sendSuccessAction = ngrxCreateAction(
  '[Message form1] Send Success',
  (payload) => payload
)
/**
 * The Send fail NGRX action
 */
export const sendFailAction = ngrxCreateAction(
  '[Message form1] Send Fail',
  (payload) => payload
)

/**
 * NGRX Action of the state initializer
 */
export const initStateAction = ngrxCreateAction(
  '[Message form1] Init State',
  (payload) => payload
)
/**
 * NGRX Action of the state's value initializer
 */
export const initValueAction = ngrxCreateAction(
  '[Message form1] Init Value',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `initValueAction` action
 */
export const initValueSuccessAction = ngrxCreateAction(
  '[Message form1] Init Value Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `initValueAction` action
 */
export const initValueFailAction = ngrxCreateAction(
  '[Message form1] Init Value Fail',
  (payload) => payload
)

/**
 * The Mask NGRX action
 */
export const maskAction = ngrxCreateAction(
  '[Message form1] Mask Screen',
  (payload) => payload
)
/**
 * The UnMask NGRX action
 */
export const unmaskAction = ngrxCreateAction(
  '[Message form1] UnMask Screen',
  (payload) => payload
)

/**
 * NGRX Action that updates a `caller` state value
 */
export const updateDataAction = ngrxCreateAction(
  '[Message form1] Update Data',
  (payload) => payload
)

/**
 * The Refresh NGRX action
 */
export const refresh = ngrxCreateAction(
  '[Message form1] Refresh Screen',
  (payload) => payload
)
/**
 * Share Widget Data in the State
 */
export const shareWidgetData = ngrxCreateAction(
  '[Message form1] Share Widget Data',
  (id, value, widgetName, propertyName) => ({
    id,
    value,
    widgetName,
    propertyName,
  })
)
