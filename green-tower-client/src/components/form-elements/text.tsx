import TextField from '@mui/material/TextField';
import React from 'react';

import { Config } from '../../config/config';

function Text({ ...props }) {
  return (
    <TextField
      fullWidth
      margin="dense"
      size="small"
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: Config.colors.light,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
          borderRadius: '16px',
          minHeight: '49px',
          '& fieldset': {
            borderColor: '#ece2d3',
          },
          '& input': {
            fontSize: '16px',
          },
          '&:hover fieldset': {
            borderColor: '#c0c0c0',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#c0c0c0',
            borderWidth: 1,
          },
        },
        '& .MuiInputLabel-root': {
          color: '#666',
          top: '4px',
          left: '4px',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: Config.colors.brown,
        },
      }}
    >
      {props.children}
    </TextField>
  );
}

export default Text;
