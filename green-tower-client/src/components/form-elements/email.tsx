import TextField from '@mui/material/TextField';
import React from 'react';
import { useLsi } from '../../hooks/common/use-lsi';

function Email({ ...props }) {
  const commonLsi = useLsi();
  return <TextField fullWidth margin="dense" size="small" autoComplete="email" label={commonLsi.email} {...props} />;
}

export default Email;
