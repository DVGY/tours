import axios from 'axios';
import { Dispatch } from 'redux';

import {
  AuthActions,
  loginStart,
  loginSuccess,
  loginFail,
  UserRole,
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
      const URL = process.env.REACT_APP_API_ENDPOINT;
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
        dispatch(loginSuccess({ role, id: _id, name, email }));
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
