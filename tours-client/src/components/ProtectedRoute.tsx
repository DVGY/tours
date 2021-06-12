import React, { FC } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';

export type ProtectedRouteProps = {
  children: JSX.Element;
} & RouteProps;

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, ...rest }) => {
  const location = useLocation();
  const { data } = useTypedSelector((reduxStore) => reduxStore.auth);

  const isUserAuthenticated = () => data?.id || localStorage.getItem('auth');

  if (isUserAuthenticated()) {
    return <Route {...rest} render={() => children} />;
  } else {
    return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  }
};

export default ProtectedRoute;
