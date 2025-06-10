import Box from '@mui/material/Box';
import React from 'react';

import generalImage from '../../../assets/plants/general.webp';

interface PlantCardImageProps {
  imageUrl?: string | null;
}

function PlantCardImage({ imageUrl }: PlantCardImageProps) {
  return (
    <Box sx={{ minWidth: 80, height: 80, mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={imageUrl ? `/${imageUrl}` : generalImage} alt="Plant image" style={{ height: '100%' }} />
    </Box>
  );
}

export default PlantCardImage;
