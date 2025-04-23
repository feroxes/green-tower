import { useContext } from 'react';
import { AuthContext } from '../context/auth-context/auth-context';

export const useAuthentication = () => {
  return useContext(AuthContext);
};
