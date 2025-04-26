import React, { useState, ReactNode } from 'react';
import { Box, Alert as MuiAlert, AlertColor } from '@mui/material';
import { AlertContext } from './alert-context';

export type Alert = {
  key: number;
  message: string;
  severity: AlertColor;
  duration?: number;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (message: string, severity: AlertColor = 'info', duration: number = 3000) => {
    const key = Date.now() + Math.random();
    setAlerts((prev) => [...prev, { key, message, severity, duration }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.key !== key));
    }, duration);
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <Box
        sx={{
          position: 'fixed',
          top: 10,
          right: 10,
          zIndex: (theme) => theme.zIndex.snackbar,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {alerts.map((a) => (
          <MuiAlert
            key={a.key}
            severity={a.severity}
            variant="filled"
            onClose={() => setAlerts((prev) => prev.filter((item) => item.key !== a.key))}
          >
            {a.message}
          </MuiAlert>
        ))}
      </Box>
    </AlertContext.Provider>
  );
};
