import { Button as Button_ } from '@mui/material';
import React from 'react';

function Button({ ...props }) {
  return (
    <Button_
      variant="contained"
      fullWidth
      {...props}
      sx={{
        height: 50,
        borderRadius: '16px',
        backgroundColor: '#4caf50',
        color: '#fff',
        fontWeight: 700,
        fontSize: '16px',
        textTransform: 'uppercase',
        border: '1px solid #1e9a1d',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        '&:hover': {
          backgroundColor: '#43a047',
        },
        '&:disabled': {
          backgroundColor: '#a5d6A7',
          color: '#eee',
        },
      }}
    >
      {props.children}
    </Button_>
  );
}

export default Button;
