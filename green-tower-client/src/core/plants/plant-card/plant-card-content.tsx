import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';

import { useLsi } from '../../../hooks/hooks';

import { PlantDto } from '../../../types/plants-types';
import { Constants } from '../../../utils/constants';
import { Lsi } from '../lsi';

interface PlantCardContentProps {
  plantDataObject: PlantDto;
}

function PlantCardContent({ plantDataObject }: PlantCardContentProps) {
  const plantsLsi = useLsi(Lsi);

  return (
    <Stack sx={{ justifyContent: 'space-between' }}>
      <Tooltip title={plantDataObject.name}>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 700,
            lineHeight: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {plantDataObject.name}
        </Typography>
      </Tooltip>
      <Stack direction="row" sx={{ alignItems: 'flex-end' }}>
        <Typography variant="body2" sx={{ lineHeight: 1 }}>
          {plantsLsi.activePlantings}
        </Typography>
        {Constants.space}
        <Typography variant="body2" sx={{ lineHeight: 1 }}>
          {plantDataObject.activePlantings || 0}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default PlantCardContent;
