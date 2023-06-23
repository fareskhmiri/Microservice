import { AuthActionTypes } from "@auth/store/actions/auth.actions";
import { MetaReducer } from "@ngrx/store";

import { State } from "./states";
/**
 * clear State
 */
export function clearState(reducer) {
  return (state, action) => {
    if (action.type === AuthActionTypes.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
/**
 * MetaReducer such as clearState
 */
export const metaReducers: MetaReducer<State>[] = [clearState];
