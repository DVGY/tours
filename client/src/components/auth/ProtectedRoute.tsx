import { FC } from 'react';
import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { localStorageProxy } from '../../utils/localStorageProxy';

export type ProtectedRouteProps = {
  children: JSX.Element;
} & RouteProps;

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { data } = useTypedSelector((reduxStore) => reduxStore.auth);

  const isUserAuthenticated = () =>
    data?.id || localStorageProxy.getItem('authtoken');

  if (isUserAuthenticated()) {
    return children;
  } else {
    return <Navigate to={'/login'} state={{ location }} />;
  }
};

export default ProtectedRoute;
