import { APIError } from '../utils';
import AuthActionTypes from './types';
import { AuthActions, AuthenticatedUser } from './action';

interface AuthState {
  loading: boolean;
  error: APIError | null;
  data: AuthenticatedUser | null;
}

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const authReducer = (
  state: AuthState = initialState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_START:
    case AuthActionTypes.SIGNUP_START:
      return {
        loading: true,
        error: null,
        data: null,
      };

    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.SIGNUP_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };

    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.SIGNUP_FAIL:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };

    default:
      return state;
  }
};

export default authReducer;
