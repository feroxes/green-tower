import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';

import Elements from './elements';
import { MenuOptionType } from './menu';

interface CardProps {
  options: MenuOptionType[];
}

function ThreeDotsMenu({ options }: CardProps) {
  const [setter, setSetter] = useState<React.Dispatch<React.SetStateAction<HTMLElement | null>>>();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setter?.(e.currentTarget);
  };

  const getSetter = (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => {
    setSetter(() => setter);
  };

  return (
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
      <Elements.Menu options={options} getSetter={getSetter} />
    </IconButton>
  );
}

export default ThreeDotsMenu;
