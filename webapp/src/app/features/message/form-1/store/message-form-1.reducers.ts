import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { get } from 'lodash'

import { ScreenState } from '@core/store'
import * as fromMessage from './message-form-1.actions'
import * as fromStore from '@app/core/store'
import * as featureAdapter from '@core/store/feature-adapter'
/**
 * The basic State interface for the `form-1` component
 *
 */
export interface State extends EntityState<ScreenState<any>> {}
/**
 * The basic NGRX reducer adapter for the `form-1` component
 *
 */
export const adapter: EntityAdapter<ScreenState<any>> = createEntityAdapter<
  ScreenState<any>
>({})
/**
 * The default state's properties for the `form-1` component
 *
 */
export const initialState: State = adapter.getInitialState()
/**
 * The basic reducer that manages the state of the `Edit` component
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
    adapter.addOne({ ...payload, loading: true }, state)
  ),
  on(fromMessage.shareWidgetData, (state, payload) =>
    featureAdapter.shareWidgetData(state, payload, adapter)
  ),
  on(fromMessage.initValueSuccessAction, (state, payload) =>
    featureAdapter.initValue<any>(state, payload, adapter)
  ),
  on(fromMessage.initValueFailAction, (state, payload) =>
    featureAdapter.cancelLoading<any>(state, payload, adapter)
  ),
  on(fromMessage.maskAction, (state, payload) =>
    featureAdapter.enableLoading<any>(state, payload, adapter)
  ),
  on(fromMessage.unmaskAction, (state, payload) =>
    featureAdapter.disableLoading<any>(state, payload, adapter)
  ),
  on(fromStore.validateScreenAction, (state, payload) =>
    adapter.updateOne(
      {
        id: payload.id,
        changes: {
          validate: payload.getData ? false : true,
          getData: payload.getData,
          lastStep: payload.lastStep,
        },
      },
      state
    )
  ),
  on(fromMessage.updateDataAction, (state, payload) =>
    featureAdapter.updateData(state, payload, adapter)
  ),
  on(fromStore.removeRelationAction, (state, payload) =>
    featureAdapter.removeRelationValue<any>(state, payload, adapter, true)
  ),
  on(fromStore.updateRelationAction, (state, payload) =>
    featureAdapter.updateRelationValue<any>(state, payload, adapter, true)
  ),

  on(fromMessage.send058028Action, (state, payload) => {
    return adapter.updateOne(
      {
        id: payload.id,
        changes: { loading: true },
      },
      state
    )
  }),
  on(
    fromMessage.send058028FailAction,
    fromMessage.send058028SuccessAction,
    (state, payload) => {
      const changes = {
        loading: false,
      }
      return adapter.updateOne(
        {
          id: payload.id,
          changes: changes,
        },
        state
      )
    }
  ),
  on(fromMessage.sendAction, (state, payload) => {
    return adapter.updateOne(
      {
        id: payload.id,
        changes: { loading: true },
      },
      state
    )
  }),
  on(
    fromMessage.sendFailAction,
    fromMessage.sendSuccessAction,
    (state, payload) => {
      const changes = {
        loading: false,
      }
      return adapter.updateOne(
        {
          id: payload.id,
          changes: changes,
        },
        state
      )
    }
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
