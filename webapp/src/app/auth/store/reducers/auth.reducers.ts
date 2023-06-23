import { logOut,logIn,logInSuccessfully,logInFailed } from '../actions/auth.actions';
import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { environment } from '@env/environment';
const LOCALE_ID = `${environment.prefix}_locale_id`;
const PROFILE = `${environment.prefix}_profile`;
export interface State {
  // error message
  errorMessage: string | null;
  authToken: any;
  loading: boolean;
}

export const initialState: State = {
  errorMessage: null,
  authToken: undefined,
  loading: false
};
const _reducer = createReducer(initialState,
  on(logOut, (state) => state),
  on(logIn, ( state, payload) => {
    return {loading: true, ...payload};
  }),
  on(logInSuccessfully,( state, payload) =>{
    localStorage.setItem(LOCALE_ID, payload.profile.language);
    localStorage.setItem(PROFILE, JSON.stringify(payload.profile));
    return {
      ...state,
      loading: false,
      errorMessage: undefined,
      authToken: { ...payload }
    };
  }),
  on(logInFailed,(state) =>{
    return {
      ...state,
      loading: false,
      errorMessage: 'This user/password pair does not exist'
    };
  })
  );
  export function reducer(state, action) {
    return _reducer(state, action);
  }

export const getAuthState = createFeatureSelector<State>('Auth');

export const errorMessageSelector = createSelector(
  getAuthState,
  (state: State) => state.errorMessage
);
