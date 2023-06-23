import { createAction as ngrxCreateAction, props, Action } from '@ngrx/store'

export const initAction = ngrxCreateAction(
  '[Message viewMessage] Init',
  (payload) => payload
)

export const destroyAction = ngrxCreateAction(
  '[Message viewMessage] Destroy',
  (payload) => payload
)

/**
 * NGRX Action of the state initializer
 */
export const initStateAction = ngrxCreateAction(
  '[Message viewMessage] Init State',
  (payload) => payload
)
/**
 * NGRX Action of the state's value initializer
 */
export const initValueAction = ngrxCreateAction(
  '[Message viewMessage] Init Value',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `initValueAction` action
 */
export const initValueSuccessAction = ngrxCreateAction(
  '[Message viewMessage] Init Value Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `initValueAction` action
 */
export const initValueFailAction = ngrxCreateAction(
  '[Message viewMessage] Init Value Fail',
  (payload) => payload
)
/**
 * The Mask NGRX action
 */
export const maskAction = ngrxCreateAction(
  '[Message viewMessage] Mask Screen',
  (payload) => payload
)
/**
 * The UnMask NGRX action
 */
export const unmaskAction = ngrxCreateAction(
  '[Message viewMessage] UnMask Screen',
  (payload) => payload
)
/**
 * NGRX Action that validate the component's data by updating the state
 */
export const validatedScreenAction = ngrxCreateAction(
  '[Message viewMessage] Validated Screen',
  (payload) => payload
)
/**
 * The Refresh NGRX action
 */
export const refresh = ngrxCreateAction(
  '[Message viewMessage] Refresh Screen',
  (payload) => payload
)

/**
 * Share Widget Data in the State
 */
export const shareWidgetData = ngrxCreateAction(
  '[Message viewMessage] Share Widget Data',
  (id, value, widgetName, propertyName) => ({
    id,
    value,
    widgetName,
    propertyName,
  })
)
