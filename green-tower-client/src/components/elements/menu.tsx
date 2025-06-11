import { Menu as Menu_ } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { TextFieldProps } from '@mui/material/TextField';
import React, { ReactNode, useEffect, useState } from 'react';

import { Config } from '../../config/config';

export interface MenuOptionType {
  label: string | ReactNode;
  onClick: () => void;
}

export interface MenuProps extends Omit<TextFieldProps, 'select' | 'children'> {
  options: MenuOptionType[];
  getSetter?: (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => void;
}

function Menu({ options, getSetter }: MenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (getSetter) getSetter(setAnchorEl);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Menu_
      slotProps={{
        paper: {
          sx: {
            borderRadius: Config.commonBorderRadius,
            backgroundColor: Config.colors.sand,
          },
        },
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={(e) => e.stopPropagation()}
    >
      {options.map((option, key) => (
        <MenuItem
          onClick={() => {
            option.onClick();
            handleClose();
          }}
          key={key}
        >
          {option.label}
        </MenuItem>
      ))}
    </Menu_>
  );
}

export default Menu;
