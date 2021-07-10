import { useState, useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface useAuthReturnType {
  isAuthenticated: boolean;
}

const useAuth = (): useAuthReturnType => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // const [currentUser, setCurrentUser] = useState(null);

  const { isAuthenticated: isAuth } = useTypedSelector(
    (reduxStore) => reduxStore.auth
  );

  useEffect(() => {
    if (isAuth) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuth, isAuthenticated]);
  return { isAuthenticated };
};

export default useAuth;
