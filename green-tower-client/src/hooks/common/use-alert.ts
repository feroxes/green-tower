import { useContext } from 'react';

import { AlertContext , AlertContextType } from '../../store/alert-context/alert-context';

export const useAlert = (): AlertContextType => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be inside AlertProvider');
  return ctx;
};
