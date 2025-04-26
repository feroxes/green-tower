import { useContext } from 'react';
import { AlertContext } from './alert-context';
import { AlertContextType } from './alert-context';

export const useAlert = (): AlertContextType => {
  return useContext(AlertContext);
};
