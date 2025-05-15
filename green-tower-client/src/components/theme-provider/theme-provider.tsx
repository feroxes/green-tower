import { createTheme, ThemeProvider as THemeProvider } from '@mui/material/styles';
import { FC, ReactNode } from 'react';

const theme = createTheme({
  typography: {
    fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  },
});

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <THemeProvider theme={theme}>{children}</THemeProvider>;
};

export default ThemeProvider;
