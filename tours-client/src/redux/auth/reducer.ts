import { APIError } from '../utils';
import AuthActionTypes from './types';
import { AuthActions, AuthenticatedUser } from './action';

interface AuthState {
  loading: boolean;
  error: APIError | null;
  data: AuthenticatedUser | null;
  isAuthenticated: boolean;
}

const initialState = {
  loading: false,
  error: null,
  data: null,
  isAuthenticated: false,
};

const authReducer = (
  state: AuthState = initialState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_START:
    case AuthActionTypes.SIGNUP_START:
    case AuthActionTypes.LOGOUT_START:
    case AuthActionTypes.UPDATE_USER_START:
      return {
        loading: true,
        error: null,
        data: null,
        isAuthenticated: false,
      };

    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.SIGNUP_SUCCESS:
    case AuthActionTypes.UPDATE_USER_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
        isAuthenticated: true,
      };
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        loading: false,
        error: null,
        data: null,
        isAuthenticated: false,
      };

    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.SIGNUP_FAIL:
    case AuthActionTypes.LOGOUT_FAIL:
    case AuthActionTypes.UPDATE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
        data: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default authReducer;
