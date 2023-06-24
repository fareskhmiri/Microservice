import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { get } from 'lodash'

import { CollectionScreenState } from '@core/store'
import * as fromMessage from './message-messagelist.actions'
import * as fromStore from '@app/core/store'
import * as featureAdapter from '@core/store/feature-adapter'
/**
 * The basic State interface for the `messagelist` component
 *
 */
export interface State extends EntityState<CollectionScreenState<any>> {}
/**
 * The basic NGRX reducer adapter for the `messagelist` component
 *
 */
export const adapter: EntityAdapter<CollectionScreenState<any>> =
  createEntityAdapter<CollectionScreenState<any>>({})
/**
 * The default state's properties for the `messagelist` component
 *
 */
export const initialState: State = adapter.getInitialState()
/**
 * The basic reducer that manages the state of the `Search` component
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

  on(fromMessage.deleteSuccessAction, (state, payload) => {
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
  }),

  on(fromMessage.maskAction, (state, payload) =>
    featureAdapter.enableLoading<any>(state, payload, adapter)
  ),
  on(fromMessage.unmaskAction, (state, payload) =>
    featureAdapter.disableLoading<any>(state, payload, adapter)
  ),
  on(fromMessage.rowsSelectionChangeAction, (state, payload) => {
    const changes = { rowsSelected: payload.rowsSelected }
    return adapter.updateOne(
      {
        id: payload.id,
        changes: changes,
      },
      state
    )
  }),
  on(fromMessage.countSuccessAction, (state, payload) => {
    const changes = {
      totalItems: payload['totalItems'],
    }
    return adapter.updateOne(
      {
        id: payload.id,
        changes: changes,
      },
      state
    )
  }),
  on(fromMessage.searchAction, fromMessage.refresh, (state, payload) => {
    return adapter.updateOne(
      {
        id: payload.id,
        changes: { loading: true },
      },
      state
    )
  }),
  on(fromMessage.searchSuccessAction, (state, payload) => {
    const changes = {
      value: payload.value,
      loading: false,
      rowId: null,
      vars: {
        size: payload.size,
        page: payload.page,
      },
    }
    return adapter.updateOne(
      {
        id: payload.id,
        changes: changes,
      },
      state
    )
  }),

  on(fromMessage.searchFailAction, (state, payload) => {
    const changes = {
      value: [],
      loading: false,
    }
    return adapter.updateOne(
      {
        id: payload.id,
        changes: changes,
      },
      state
    )
  }),
  on(fromMessage.updateDataAction, (state: any, payload) => {
    const changes = {
      value: payload.data,
      loading: false,
    }
    return adapter.updateOne(
      {
        id: payload.id,
        changes: changes,
      },
      state
    )
  })
)
/**
 * Exports the current reducer's function
 * @param state
 * @param action
 */
export function reducer(state, action) {
  return _reducer(state, action)
}
