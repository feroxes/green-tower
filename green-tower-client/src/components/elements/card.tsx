import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import React, { ReactNode } from 'react';

import { Config } from '../../config/config';
import Elements from './elements';
import { MenuOptionType } from './menu';

interface CardProps {
  children: ReactNode;
  bgcolor?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  menuOptions?: MenuOptionType[];
}

function Card({ children, bgcolor = '#fff7da', onClick, sx = {}, menuOptions }: CardProps) {
  const isClickable = Boolean(onClick);
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        bgcolor,
        p: 0.6,
        borderRadius: Config.commonBorderRadius,
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        transition: 'transform 0.1s ease, box-shadow 0.1s ease',
        ...(isClickable && {
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 8px 14px rgba(0, 0, 0, 0.15)',
          },
          '&:active': {
            transform: 'scale(0.99)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
          },
        }),
        ...sx,
      }}
    >
      {children}
      {menuOptions && <Elements.ThreeDotsMenu options={menuOptions} />}
    </Box>
  );
}

export default Card;
