import { createReducer, on, ActionReducerMap } from "@ngrx/store";
import * as fromRouter from "@ngrx/router-store";

import { CustomRouterReducerState, State } from "./states";

const initialState: CustomRouterReducerState = {
  current: null
};

const _reducer = createReducer(
  initialState,
  on(fromRouter.routerNavigationAction, (state, payload: any) => {
    const finalState = {...state};
    if (payload.payload && payload.payload.routerState) {
      finalState["current"] = {
        url: payload.payload.routerState.url,
        params: payload.payload.routerState.params,
        queryParams: payload.payload.routerState.queryParams
      };
    }
    return finalState;
  })
);

export function reducer(state, action) {
  return _reducer(state, action);
}
export const reducers: ActionReducerMap<State> = {
  routerReducer: reducer
};
