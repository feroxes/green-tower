import { FC, ReactNode, useState } from 'react';
import { AuthContext } from './auth-context';
import { setAccessTokenMemory } from './auth-store';

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token: string) => {
    setIsAuthenticated(true);
    setAccessTokenMemory(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAccessTokenMemory(null);
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};
