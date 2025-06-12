import Stack from '@mui/material/Stack';
import React, { JSX } from 'react';

import { ColorScheme } from '../../types/types';

interface LabelProps {
  children: JSX.Element | string;
  colorScheme: ColorScheme;
}

function Label({ children, colorScheme }: LabelProps) {
  const colorSchemeMap = {
    [ColorScheme.SUCCESS]: {
      bgcolor: '#f0f1c7',
      color: '#1f6923',
    },
    [ColorScheme.WARNING]: {
      bgcolor: '#ff9459',
      color: '#fdfdfb',
    },
    [ColorScheme.ERROR]: {
      bgcolor: '#d95c35',
      color: '#81322a',
    },
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: 1,
        bgcolor: colorSchemeMap[colorScheme].bgcolor,
        color: colorSchemeMap[colorScheme].color,
        borderRadius: 3,
        justifyContent: 'center',
        maxWidth: 125,
      }}
    >
      {children}
    </Stack>
  );
}

export default Label;
