import Box from '@mui/material/Box';
import React from 'react';

import generalImage from '../../../assets/plants/general.webp';

interface PlantCardImageProps {
  imageUrl?: string | null;
  size?: number | null;
}

function PlantCardImage({ imageUrl, size = 80 }: PlantCardImageProps) {
  return (
    <Box sx={{ minWidth: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={imageUrl ? `/${imageUrl}` : generalImage} alt="Plant image" style={{ height: '100%' }} />
    </Box>
  );
}

export default PlantCardImage;
