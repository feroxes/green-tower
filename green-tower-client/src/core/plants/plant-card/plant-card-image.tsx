import Box from '@mui/material/Box';
import React from 'react';

import { plantImageMap } from '../../../hooks/plants/use-auto-plant-image';

interface PlantCardImageProps {
  imageUrl?: string | null;
  size?: number | null;
}

function PlantCardImage({ imageUrl, size = 80 }: PlantCardImageProps) {
  return (
    <Box sx={{ minWidth: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={imageUrl || plantImageMap.general} alt="Plant image" style={{ height: '100%' }} />
    </Box>
  );
}

export default PlantCardImage;
