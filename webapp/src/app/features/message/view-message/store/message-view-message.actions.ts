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
 * The Cancel NGRX action
 */
export const cancelAction = ngrxCreateAction(
  '[Message viewMessage] Cancel',
  (payload) => payload
)
/**
 * The Cancel success NGRX action
 */
export const cancelSuccessAction = ngrxCreateAction(
  '[Message viewMessage] Cancel Success',
  (payload) => payload
)
/**
 * The Cancel fail NGRX action
 */
export const cancelFailAction = ngrxCreateAction(
  '[Message viewMessage] Cancel Fail',
  (payload) => payload
)
/**
 * The Edit NGRX action
 */
export const editAction = ngrxCreateAction(
  '[Message viewMessage] Edit',
  (payload) => payload
)
/**
 * The Edit success NGRX action
 */
export const editSuccessAction = ngrxCreateAction(
  '[Message viewMessage] Edit Success',
  (payload) => payload
)
/**
 * The Edit fail NGRX action
 */
export const editFailAction = ngrxCreateAction(
  '[Message viewMessage] Edit Fail',
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
