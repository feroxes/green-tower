import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

import { useDevice } from '../../hooks/hooks';

interface RouteHeaderProps {
  header: string;
  actionButton?: ReactNode;
}

function RouteHeader({ header, actionButton }: RouteHeaderProps) {
  const { isMobile } = useDevice();

  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
      <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ fontWeight: 700 }}>
        {header}
      </Typography>
      {actionButton && actionButton}
    </Stack>
  );
}

export default RouteHeader;
