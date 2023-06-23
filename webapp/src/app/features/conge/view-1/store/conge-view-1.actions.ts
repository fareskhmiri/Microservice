import { createAction as ngrxCreateAction, props, Action } from '@ngrx/store'

export const initAction = ngrxCreateAction(
  '[Conge view1] Init',
  (payload) => payload
)

export const destroyAction = ngrxCreateAction(
  '[Conge view1] Destroy',
  (payload) => payload
)

/**
 * NGRX Action of the state initializer
 */
export const initStateAction = ngrxCreateAction(
  '[Conge view1] Init State',
  (payload) => payload
)
/**
 * NGRX Action of the state's value initializer
 */
export const initValueAction = ngrxCreateAction(
  '[Conge view1] Init Value',
  (payload) => payload
)
/**
 * NGRX Action of the success execution of the `initValueAction` action
 */
export const initValueSuccessAction = ngrxCreateAction(
  '[Conge view1] Init Value Success',
  (payload) => payload
)
/**
 * NGRX Action of the fail execution of the `initValueAction` action
 */
export const initValueFailAction = ngrxCreateAction(
  '[Conge view1] Init Value Fail',
  (payload) => payload
)
/**
 * The Mask NGRX action
 */
export const maskAction = ngrxCreateAction(
  '[Conge view1] Mask Screen',
  (payload) => payload
)
/**
 * The UnMask NGRX action
 */
export const unmaskAction = ngrxCreateAction(
  '[Conge view1] UnMask Screen',
  (payload) => payload
)
/**
 * NGRX Action that validate the component's data by updating the state
 */
export const validatedScreenAction = ngrxCreateAction(
  '[Conge view1] Validated Screen',
  (payload) => payload
)
/**
 * The Refresh NGRX action
 */
export const refresh = ngrxCreateAction(
  '[Conge view1] Refresh Screen',
  (payload) => payload
)

/**
 * Share Widget Data in the State
 */
export const shareWidgetData = ngrxCreateAction(
  '[Conge view1] Share Widget Data',
  (id, value, widgetName, propertyName) => ({
    id,
    value,
    widgetName,
    propertyName,
  })
)
