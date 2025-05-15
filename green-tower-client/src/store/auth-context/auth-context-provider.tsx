import { useQuery } from '@tanstack/react-query';
import { FC, ReactNode, useEffect,useState } from 'react';

import Calls from '../../services/calls';
import { AuthContext } from './auth-context';
import { setAccessTokenMemory } from './auth-store';

type AuthRefreshDto = {
  newAccessToken: string;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, isFetching } = useQuery<AuthRefreshDto, unknown>({
    queryKey: ['auth/refresh'],
    queryFn: () => Calls.Auth.refresh().then((res) => res.data),
  });

  const login = (token: string) => {
    setIsAuthenticated(true);
    setAccessTokenMemory(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAccessTokenMemory(null);
  };

  useEffect(() => {
    if (data) login(data.newAccessToken);
  }, [data]);

  if (isFetching) return null;

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};
