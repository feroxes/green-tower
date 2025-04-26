import { createContext } from 'react';
import { AlertColor } from '@mui/material';

export type AlertContextType = {
  addAlert: (message: string, severity?: AlertColor, duration?: number) => void;
};

export const AlertContext = createContext<AlertContextType>({
  addAlert: () => {},
});
