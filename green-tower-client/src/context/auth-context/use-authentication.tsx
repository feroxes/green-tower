import { useContext } from 'react';
import { AuthContext } from './auth-context';

export const useAuthentication = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
