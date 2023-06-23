import { ActionReducerMap } from '@ngrx/store'
import * as fromAddDepartment from '../../add-department/store'
import * as fromSearch1 from '../../search-1/store'
import * as fromRoot from '@core/store'
/**
 * NGRX State interface for the `Departement` feature
 */
export interface DepartementState {
  /**
   * The NGRX State for the `AddDepartment` screen component
   */
  AddDepartment: fromAddDepartment.State
  /**
   * The NGRX State for the `Search1` screen component
   */
  Search1: fromSearch1.State
}
/**
 * NGRX reducers for the `Departement` feature
 */
export const reducers: ActionReducerMap<DepartementState, any> = {
  /**
   * The NGRX Reducer for the `AddDepartment` screen component
   */
  AddDepartment: fromAddDepartment.reducer,
  /**
   * The NGRX Reducer for the `Search1` screen component
   */
  Search1: fromSearch1.reducer,
}
