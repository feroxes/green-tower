import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useCallback } from 'react';

import Elements from '../../../components/elements/elements';

import { useLsi } from '../../../hooks/hooks';

import { CustomerDto } from '../../../types/customers-types';
import CustomerCardContent from './customer-card-content';
import CustomerCardLogo from './customer-card-logo';

interface CustomerCardProps {
  customerDataObject: CustomerDto;
}

function CustomerCard({ customerDataObject }: CustomerCardProps) {
  const lsi = useLsi();
  const getMenuOptions = useCallback(() => {
    return [
      { label: lsi.edit, onClick: () => console.log('----->123<-----') },
      { label: lsi.delete, onClick: () => console.log('----->123<-----') },
    ];
  }, [lsi]);

  return (
    <Box sx={{ maxWidth: '280px', position: 'relative' }}>
      <Elements.Card menuOptions={getMenuOptions()}>
        <Stack direction="row" sx={{ py: 2, pl: 1, pr: 2 }}>
          <Stack sx={{ mr: 2 }} justifyContent="center">
            <CustomerCardLogo name={customerDataObject.name} />
          </Stack>
          <CustomerCardContent customerDataObject={customerDataObject} />
        </Stack>
      </Elements.Card>
    </Box>
  );
}

export default CustomerCard;
