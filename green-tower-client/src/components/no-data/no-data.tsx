import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import { plantImageMap } from '../../hooks/plants/use-auto-plant-image';

import Elements from '../elements/elements';

interface NoDataProps {
  header: string;
  subheader: string;
}

function NoData({ header, subheader }: NoDataProps) {
  return (
    <Box sx={{ maxWidth: '320px' }}>
      <Elements.Card>
        <Stack direction="column" sx={{ alignItems: 'center', p: 2 }}>
          <Box
            sx={{ minWidth: 80, height: 80, mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img src={plantImageMap.general} alt="Plant image" style={{ height: '100%' }} />
          </Box>
          <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 600, mt: 1, lineHeight: 1 }}>
            {header}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {subheader}
          </Typography>
        </Stack>
      </Elements.Card>
    </Box>
  );
}

export default NoData;
