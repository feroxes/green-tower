import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useLsi } from '../../hooks/common/use-lsi';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Password({ ...props }) {
  const commonLsi = useLsi();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      fullWidth
      margin="dense"
      size="small"
      type={showPassword ? 'text' : 'password'}
      autoComplete="current-password"
      label={props.confirm ? commonLsi.confirmPassword : commonLsi.password}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end" size="small">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
}

export default Password;
