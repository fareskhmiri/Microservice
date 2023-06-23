import { ActionReducerMap } from '@ngrx/store'
import * as fromAddConge from '../../add-conge/store'
import * as fromListconge from '../../listconge/store'
import * as fromView1 from '../../view-1/store'
import * as fromRoot from '@core/store'
/**
 * NGRX State interface for the `Conge` feature
 */
export interface CongeState {
  /**
   * The NGRX State for the `AddConge` screen component
   */
  AddConge: fromAddConge.State
  /**
   * The NGRX State for the `Listconge` screen component
   */
  Listconge: fromListconge.State
  /**
   * The NGRX State for the `View1` screen component
   */
  View1: fromView1.State
}
/**
 * NGRX reducers for the `Conge` feature
 */
export const reducers: ActionReducerMap<CongeState, any> = {
  /**
   * The NGRX Reducer for the `AddConge` screen component
   */
  AddConge: fromAddConge.reducer,
  /**
   * The NGRX Reducer for the `Listconge` screen component
   */
  Listconge: fromListconge.reducer,
  /**
   * The NGRX Reducer for the `View1` screen component
   */
  View1: fromView1.reducer,
}
