import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { get } from 'lodash'

import { ScreenState } from '@core/store'
import * as fromConge from './conge-add-conge.actions'
import * as fromStore from '@app/core/store'
import * as featureAdapter from '@core/store/feature-adapter'
/**
 * The basic State interface for the `add-conge` component
 *
 */
export interface State extends EntityState<ScreenState<any>> {}
/**
 * The basic NGRX reducer adapter for the `add-conge` component
 *
 */
export const adapter: EntityAdapter<ScreenState<any>> = createEntityAdapter<
  ScreenState<any>
>({})
/**
 * The default state's properties for the `add-conge` component
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
  on(fromConge.initAction, (state, payload) => adapter.addOne(payload, state)),
  on(fromConge.destroyAction, (state, payload) =>
    adapter.removeOne(payload.id, state)
  ),
  on(fromConge.initStateAction, (state, payload) =>
    adapter.addOne({ ...payload, loading: true }, state)
  ),
  on(fromConge.shareWidgetData, (state, payload) =>
    featureAdapter.shareWidgetData(state, payload, adapter)
  ),
  on(fromConge.initValueSuccessAction, (state, payload) =>
    featureAdapter.initValue<any>(state, payload, adapter)
  ),
  on(fromConge.initValueFailAction, (state, payload) =>
    featureAdapter.cancelLoading<any>(state, payload, adapter)
  ),
  on(fromConge.maskAction, (state, payload) =>
    featureAdapter.enableLoading<any>(state, payload, adapter)
  ),
  on(fromConge.unmaskAction, (state, payload) =>
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
  on(fromConge.updateDataAction, (state, payload) =>
    featureAdapter.updateData(state, payload, adapter)
  ),
  on(fromStore.removeRelationAction, (state, payload) =>
    featureAdapter.removeRelationValue<any>(state, payload, adapter, true)
  ),
  on(fromStore.updateRelationAction, (state, payload) =>
    featureAdapter.updateRelationValue<any>(state, payload, adapter, true)
  ),

  on(fromConge.button35872039101Action, (state, payload) => {
    return adapter.updateOne(
      {
        id: payload.id,
        changes: { loading: true },
      },
      state
    )
  }),
  on(
    fromConge.button35872039101FailAction,
    fromConge.button35872039101SuccessAction,
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
  on(fromConge.button35872Action, (state, payload) => {
    return adapter.updateOne(
      {
        id: payload.id,
        changes: { loading: true },
      },
      state
    )
  }),
  on(
    fromConge.button35872FailAction,
    fromConge.button35872SuccessAction,
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
