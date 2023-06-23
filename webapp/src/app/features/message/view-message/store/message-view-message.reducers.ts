import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { get } from 'lodash'

import { ScreenState } from '@core/store'
import * as fromMessage from './message-view-message.actions'
import * as fromStore from '@app/core/store'
import * as featureAdapter from '@core/store/feature-adapter'
/**
 * The basic State interface for the `view-message` component
 *
 */
export interface State extends EntityState<ScreenState<any>> {}
/**
 * The basic NGRX reducer adapter for the `view-message` component
 *
 */
export const adapter: EntityAdapter<ScreenState<any>> = createEntityAdapter<
  ScreenState<any>
>({})
/**
 * The default state's properties for the `view-message` component
 *
 */
export const initialState: State = adapter.getInitialState()
/**
 * The basic reducer that manages the state of the `view` component
 *
 * It is not recommended to modify this file.
 */
const _reducer = createReducer(
  initialState,
  on(fromMessage.initAction, (state, payload) =>
    adapter.addOne(payload, state)
  ),
  on(fromMessage.destroyAction, (state, payload) =>
    adapter.removeOne(payload.id, state)
  ),
  on(fromMessage.initStateAction, (state, payload) =>
    adapter.addOne({ ...payload }, state)
  ),
  on(fromMessage.shareWidgetData, (state, payload) =>
    featureAdapter.shareWidgetData(state, payload, adapter)
  ),
  on(fromMessage.maskAction, (state, payload) =>
    featureAdapter.enableLoading<any>(state, payload, adapter)
  ),
  on(fromMessage.unmaskAction, (state, payload) =>
    featureAdapter.disableLoading<any>(state, payload, adapter)
  ),
  on(fromMessage.initValueAction, (state, payload) =>
    state.entities[payload.id]
      ? adapter.updateOne({ id: payload.id, changes: { loading: true } }, state)
      : adapter.addOne({ ...payload, loading: true }, state)
  ),
  on(fromMessage.initValueSuccessAction, (state, payload) =>
    featureAdapter.initValue<any>(state, payload, adapter)
  ),
  on(fromMessage.initValueFailAction, (state, payload) =>
    featureAdapter.cancelLoading<any>(state, payload, adapter)
  ),
  on(fromStore.validateScreenAction, (state, payload) =>
    adapter.updateOne({ id: payload.id, changes: { validate: true } }, state)
  ),
  on(fromMessage.validatedScreenAction, (state, payload) =>
    featureAdapter.updateData(state, payload, adapter)
  )
)
/**
 * Exports the current reducer's function
 * @param state
 * @param action
 */
export function reducer(state, action) {
  return _reducer(state, action)
}
