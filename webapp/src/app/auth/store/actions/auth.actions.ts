import { createAction as ngrxCreateAction } from '@ngrx/store';
/**
 * The NGRX actions` types
 */
export enum AuthActionTypes {
  LOGOUT = '[Auth] Logout',
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESSFULLY = '[Auth] Login Succefully',
  LOGIN_FAILED = '[Auth] Login Failed'
}
/**
 * The NGRX logout action
 */
export const logOut = ngrxCreateAction(AuthActionTypes.LOGOUT, payload => payload);
/**
 * The NGRX login action
 */
export const logIn = ngrxCreateAction(AuthActionTypes.LOGIN, payload => payload);
/**
 * The NGRX success login action
 */
export const logInSuccessfully = ngrxCreateAction(AuthActionTypes.LOGIN_SUCCESSFULLY, payload => payload);
/**
 * The NGRX failed login action
 */
export const logInFailed = ngrxCreateAction(AuthActionTypes.LOGIN_FAILED, payload => payload);

