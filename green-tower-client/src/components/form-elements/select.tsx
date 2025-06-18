import MenuItem from '@mui/material/MenuItem';
import { TextFieldProps } from '@mui/material/TextField';
import React, { ReactNode } from 'react';

import { Config } from '../../config/config';
import FormElements from './form-elements';

export interface SelectOption {
  value: string | number;
  label: string | ReactNode;
}

export interface SelectProps extends Omit<TextFieldProps, 'select' | 'children'> {
  options: SelectOption[];
}
function Select({ options, ...props }: SelectProps) {
  return (
    <FormElements.Text
      select
      slotProps={{
        select: {
          MenuProps: {
            PaperProps: {
              sx: {
                backgroundColor: Config.colors.sand,
                borderRadius: Config.commonBorderRadius,
              },
            },
          },
        },
      }}
      {...props}
    >
      {options.map((item) => (
        <MenuItem value={item.value} key={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </FormElements.Text>
  );
}

export default Select;
