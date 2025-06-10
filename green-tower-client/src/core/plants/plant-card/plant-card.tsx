import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React from 'react';

import Elements from '../../../components/elements/elements';

import { PlantDto } from '../../../types/plants-types';
import PlantCardContent from './plant-card-content';
import PlantCardImage from './plant-card-image';

interface PlantCardProps {
  plantDataObject: PlantDto;
}

function PlantCard({ plantDataObject }: PlantCardProps) {
  function handleOnPlantCartClick() {
    console.log('----->1<-----', 1);
  }

  return (
    <Box sx={{ maxWidth: '320px', position: 'relative' }}>
      <Elements.Card onClick={handleOnPlantCartClick} showMenu>
        <Stack direction="row" sx={{ py: 1, pl: 1, pr: 2 }}>
          <PlantCardImage imageUrl={plantDataObject.imageUrl} />
          <PlantCardContent plantDataObject={plantDataObject} />
        </Stack>
      </Elements.Card>
    </Box>
  );
}

export default PlantCard;
