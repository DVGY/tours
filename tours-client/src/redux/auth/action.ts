import { APIError } from '../utils';
import AuthActionTypes from './types';

//-----------------------------------//
// ------ACTION LOGIN---------------//
// ---------------------------------//

export const loginStart = (): LoginStartAction => ({
  type: AuthActionTypes.LOGIN_START,
});

export const loginSuccess = (
  loggedInUser: AuthenticatedUser
): LoginSuccessAction => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  payload: loggedInUser,
});

export const loginFail = (error: APIError): LoginFailAction => ({
  type: AuthActionTypes.LOGIN_FAIL,
  payload: error,
});

//-----------------------------------//
// ------ACTION LOGIN INTERFACES------//
// ---------------------------------//

interface LoginStartAction {
  type: AuthActionTypes.LOGIN_START;
}

interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: AuthenticatedUser;
}

interface LoginFailAction {
  type: AuthActionTypes.LOGIN_FAIL;
  payload: APIError;
}

//-----------------------------------//
// ------ACTION LOGIN---------------//
// ---------------------------------//

export const logoutStart = (): LogoutStartAction => ({
  type: AuthActionTypes.LOGOUT_START,
});

export const logoutSuccess = (): LogoutSuccessAction => ({
  type: AuthActionTypes.LOGOUT_SUCCESS,
});

export const logoutFail = (error: APIError): LogoutFailAction => ({
  type: AuthActionTypes.LOGOUT_FAIL,
  payload: error,
});

//-----------------------------------//
// ------ACTION LOGOUT INTERFACES------//
// ---------------------------------//

interface LogoutStartAction {
  type: AuthActionTypes.LOGOUT_START;
}

interface LogoutSuccessAction {
  type: AuthActionTypes.LOGOUT_SUCCESS;
}

interface LogoutFailAction {
  type: AuthActionTypes.LOGOUT_FAIL;
  payload: APIError;
}

//-----------------------------------//
// ------ACTION SIGNUP---------------//
// ---------------------------------//

export const signupStart = (): SignupStartAction => ({
  type: AuthActionTypes.SIGNUP_START,
});

export const signupSuccess = (
  loggedInUser: AuthenticatedUser
): SignupSuccessAction => ({
  type: AuthActionTypes.SIGNUP_SUCCESS,
  payload: loggedInUser,
});

export const signupFail = (error: APIError): SignupFailAction => ({
  type: AuthActionTypes.SIGNUP_FAIL,
  payload: error,
});

//-----------------------------------//
// ------ACTION SIGNUP INTERFACE------//
// ---------------------------------//

interface SignupStartAction {
  type: AuthActionTypes.SIGNUP_START;
}

interface SignupSuccessAction {
  type: AuthActionTypes.SIGNUP_SUCCESS;
  payload: AuthenticatedUser;
}

interface SignupFailAction {
  type: AuthActionTypes.SIGNUP_FAIL;
  payload: APIError;
}

//-----------------------------------//
// ------ACTION UPDATE USER-----------//
// ---------------------------------//

export const updateUserStart = (): UpdateUserStartAction => ({
  type: AuthActionTypes.UPDATE_USER_START,
});

export const updateUserSuccess = (
  loggedInUser: AuthenticatedUser
): UpdateUserSuccessAction => ({
  type: AuthActionTypes.UPDATE_USER_SUCCESS,
  payload: loggedInUser,
});

export const updateUserFail = (error: APIError): UpdateUserFailAction => ({
  type: AuthActionTypes.UPDATE_USER_FAIL,
  payload: error,
});

//-----------------------------------//
// ------ACTION SIGNUP INTERFACE------//
// ---------------------------------//

interface UpdateUserStartAction {
  type: AuthActionTypes.UPDATE_USER_START;
}

interface UpdateUserSuccessAction {
  type: AuthActionTypes.UPDATE_USER_SUCCESS;
  payload: AuthenticatedUser;
}

interface UpdateUserFailAction {
  type: AuthActionTypes.UPDATE_USER_FAIL;
  payload: APIError;
}

//-----------------------------------//
// ------TYPE & INTERFACE------------//
// ---------------------------------//
export type AuthenticatedUser = {
  id: string;
  role: UserRole;
  name: string;
  email: string;
};

export enum UserRole {
  ADMIN = 'ADMIN',
  LEAD_GUIDE = 'LEAD_GUIDE',
  GUIDE = 'GUIDE',
  USER = 'USER',
}

export type AuthActions =
  | LoginStartAction
  | LoginFailAction
  | LoginSuccessAction
  | SignupStartAction
  | SignupSuccessAction
  | SignupFailAction
  | LogoutStartAction
  | LogoutSuccessAction
  | LogoutFailAction
  | UpdateUserStartAction
  | UpdateUserSuccessAction
  | UpdateUserFailAction;
