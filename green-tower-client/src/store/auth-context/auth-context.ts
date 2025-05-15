import { createContext } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>({
  isAuthenticated: false,
  login: (_token: string) => {},
  logout: () => {},
});
