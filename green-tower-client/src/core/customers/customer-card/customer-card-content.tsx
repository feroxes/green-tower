import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';

import { CustomerDto } from '../../../types/customers-types';

interface CustomerCardContentProps {
  customerDataObject: CustomerDto;
}

function CustomerCardContent({ customerDataObject }: CustomerCardContentProps) {
  function formatPhoneNumber(phone: string): string {
    const match = phone.match(/^\+(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (!match) return phone;
    const [, country, code, part1, part2, part3] = match;
    return `+${country} ${code} ${part1} ${part2} ${part3}`;
  }

  return (
    <Stack sx={{ justifyContent: 'space-between' }}>
      <Tooltip title={customerDataObject.name}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            lineHeight: 1,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {customerDataObject.name}
        </Typography>
      </Tooltip>

      <Typography variant="body2" sx={{ lineHeight: 1 }}>
        {formatPhoneNumber(customerDataObject.phone)}
      </Typography>
    </Stack>
  );
}

export default CustomerCardContent;
