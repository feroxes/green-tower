import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Config } from '../../../config/config';

interface CustomerLogoProps {
  name: string;
}

function CustomerCardLogo({ name }: CustomerLogoProps) {
  function getLogoValue() {
    return name
      .split(' ')
      .filter(Boolean)
      .map((word) => word[0].toUpperCase())
      .slice(0, 2)
      .join('');
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        borderRadius: '50%',
        height: 60,
        width: 60,
        bgcolor: Config.colors.green,
        color: Config.colors.light,
        border: `1px solid ${Config.colors.deepGreen}`,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {getLogoValue()}
      </Typography>
    </Stack>
  );
}

export default CustomerCardLogo;
