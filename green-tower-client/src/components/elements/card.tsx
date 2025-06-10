import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { SxProps, Theme } from '@mui/material/styles';
import React, { ReactNode, useState } from 'react';

import { Config } from '../../config/config';

interface CardProps {
  children: ReactNode;
  bgcolor?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  showMenu?: boolean;
}

function Card({ children, bgcolor = '#fff7da', onClick, sx = {}, showMenu = false }: CardProps) {
  const isClickable = Boolean(onClick);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        bgcolor,
        p: 0.6,
        borderRadius: 3,
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
      {showMenu && (
        <IconButton
          size="small"
          onClick={handleClick}
          sx={{
            position: 'absolute',
            top: 6,
            right: 0,
            zIndex: 1,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <MoreVertIcon />
          <Menu
            slotProps={{
              paper: {
                sx: {
                  borderRadius: '12px',
                  backgroundColor: Config.colors.sand,
                },
              },
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
        </IconButton>
      )}
    </Box>
  );
}

export default Card;
