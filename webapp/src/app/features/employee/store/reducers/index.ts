import { ActionReducerMap } from '@ngrx/store'
import * as fromForm1 from '../../form-1/store'
import * as fromSearch1 from '../../search-1/store'
import * as fromRoot from '@core/store'
/**
 * NGRX State interface for the `Employee` feature
 */
export interface EmployeeState {
  /**
   * The NGRX State for the `Form1` screen component
   */
  Form1: fromForm1.State
  /**
   * The NGRX State for the `Search1` screen component
   */
  Search1: fromSearch1.State
}
/**
 * NGRX reducers for the `Employee` feature
 */
export const reducers: ActionReducerMap<EmployeeState, any> = {
  /**
   * The NGRX Reducer for the `Form1` screen component
   */
  Form1: fromForm1.reducer,
  /**
   * The NGRX Reducer for the `Search1` screen component
   */
  Search1: fromSearch1.reducer,
}
