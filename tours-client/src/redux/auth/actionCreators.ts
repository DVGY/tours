import axios from 'axios';
import { Dispatch } from 'redux';
import { localStorageProxy } from '../../utils/localStorageProxy';

import {
  AuthActions,
  UserRole,
  loginStart,
  loginSuccess,
  loginFail,
  logoutStart,
  logoutSuccess,
  logoutFail,
  signupStart,
  signupFail,
  signupSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
} from './action';

export type AuthenticatedReponse = {
  status: string;
  token: string;
  data?: {
    user: {
      role: UserRole;
      _id: string;
      name: string;
      email: string;
      [extraDataProps: string]: string | number;
    };
  };
  error?: unknown;
  message: string;
  stack?: string;
};

// Action Login User
export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthActions>): Promise<void> => {
    dispatch(loginStart());

    try {
      if (!process.env.REACT_APP_API_ENDPOINT) {
        throw new Error('ENVIRONMENT VARIABLE API_ENDPOINT NOT DEFINED');
      }
      const body = {
        email,
        password,
      };
      const URL = `${process.env.REACT_APP_API_ENDPOINT}users/login`;
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.post<AuthenticatedReponse>(
        URL,
        body,
        config
      );

      if (data.data) {
        const { role, _id, name, email } = data.data.user;

        const userInfo = {
          role,
          id: _id,
          name,
          email,
        };

        localStorage.setItem('authtoken', data.token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        dispatch(loginSuccess(userInfo));
      } else {
        // Custom Notify/Warn/Error Dispatch
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        dispatch(
          loginFail({
            stack: err.response?.data.stack,
            status: err.response?.data.status,
            message: err.response?.data.message,
            error: err.response?.data.error,
          })
        );
      } else {
        // Custom Notify/Warn/Error Dispatch
      }
    }
  };
};

// Action Logout User
export const logoutUser = () => {
  return async (dispatch: Dispatch<AuthActions>): Promise<void> => {
    dispatch(logoutStart());

    try {
      if (!process.env.REACT_APP_API_ENDPOINT) {
        throw new Error('ENVIRONMENT VARIABLE API_ENDPOINT NOT DEFINED');
      }

      const URL = `${process.env.REACT_APP_API_ENDPOINT}users/logout`;
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get<AuthenticatedReponse>(URL, config);

      if (data.status === 'success') {
        localStorageProxy.removeItem('userInfo');
        localStorageProxy.removeItem('authtoken');
        dispatch(logoutSuccess());
      } else {
        // Custom Notify/Warn/Error Dispatch
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        dispatch(
          logoutFail({
            stack: err.response?.data.stack,
            status: err.response?.data.status,
            message: err.response?.data.message,
            error: err.response?.data.error,
          })
        );
      } else {
        // Custom Notify/Warn/Error Dispatch
      }
    }
  };
};

// Action Signup User
export const signupUser = (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
) => {
  return async (dispatch: Dispatch<AuthActions>): Promise<void> => {
    dispatch(signupStart());

    try {
      if (!process.env.REACT_APP_API_ENDPOINT) {
        throw new Error('ENVIRONMENT VARIABLE API_ENDPOINT NOT DEFINED');
      }
      const body = {
        name,
        email,
        password,
        passwordConfirm,
      };
      const URL = `${process.env.REACT_APP_API_ENDPOINT}users/signup`;
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.post<AuthenticatedReponse>(
        URL,
        body,
        config
      );

      if (data.data) {
        const { role, _id, name, email } = data.data.user;

        const userInfo = {
          role,
          id: _id,
          name,
          email,
        };

        localStorageProxy.setItem('authtoken', data.token);
        localStorageProxy.setItem('userInfo', JSON.stringify(userInfo));

        dispatch(signupSuccess(userInfo));
      } else {
        // Custom Notify/Warn/Error Dispatch
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        dispatch(
          signupFail({
            stack: err.response?.data.stack,
            status: err.response?.data.status,
            message: err.response?.data.message,
            error: err.response?.data.error,
          })
        );
      } else {
        // Custom Notify/Warn/Error Dispatch
      }
    }
  };
};

// Action User Profile Information
export const updatedUserProfile = (name: string, email: string) => {
  return async (dispatch: Dispatch<AuthActions>): Promise<void> => {
    dispatch(updateUserStart());

    try {
      if (!process.env.REACT_APP_API_ENDPOINT) {
        throw new Error('ENVIRONMENT VARIABLE API_ENDPOINT NOT DEFINED');
      }
      const body = {
        name,
        email,
      };
      const URL = `${process.env.REACT_APP_API_ENDPOINT}users/updateMe`;
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.patch<AuthenticatedReponse>(
        URL,
        body,
        config
      );

      if (data.data) {
        const { role, _id, name, email } = data.data.user;

        const userInfo = {
          role,
          id: _id,
          name,
          email,
        };

        localStorageProxy.setItem('authtoken', data.token);
        localStorageProxy.setItem('userInfo', JSON.stringify(userInfo));

        dispatch(updateUserSuccess(userInfo));
      } else {
        // Custom Notify/Warn/Error Dispatch
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        dispatch(
          updateUserFail({
            stack: err.response?.data.stack,
            status: err.response?.data.status,
            message: err.response?.data.message,
            error: err.response?.data.error,
          })
        );
      } else {
        // Custom Notify/Warn/Error Dispatch
      }
    }
  };
};
