import { AlertColor } from '@mui/material';
import { createContext } from 'react';

export type AlertContextType = {
  addAlert: (message: string, severity?: AlertColor, duration?: number) => void;
};

export const AlertContext = createContext<AlertContextType>({
  addAlert: () => {},
});
