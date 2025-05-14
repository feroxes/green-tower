import TextField from '@mui/material/TextField';
import React from 'react';

function Text({ ...props }) {
  return <TextField fullWidth margin="dense" size="small" {...props} />;
}

export default Text;
