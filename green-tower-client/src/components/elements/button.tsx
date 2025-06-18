import { Button as Button_ } from '@mui/material';
import React from 'react';

import { useDevice } from '../../hooks/hooks';

import { Config } from '../../config/config';

function Button({ sx = {}, ...props }) {
  const { isMobile } = useDevice();
  return (
    <Button_
      variant="contained"
      fullWidth
      {...props}
      sx={{
        height: isMobile ? 40 : 50,
        borderRadius: Config.commonBorderRadius,
        backgroundColor: Config.colors.lightGreen,
        color: '#fff',
        fontWeight: 700,
        fontSize: isMobile ? '14px' : '16px',
        textTransform: 'uppercase',
        border: '1px solid #1e9a1d',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        '&:hover': {
          backgroundColor: '#43a047',
        },
        '&:disabled': {
          backgroundColor: '#a5d6A7',
          border: '1px solid transparent',
          color: '#eee',
        },
        ...sx,
      }}
    >
      {props.children}
    </Button_>
  );
}

export default Button;
