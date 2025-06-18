import Box from '@mui/material/Box';

import Elements from '../../components/elements/elements';
import RouteHeader from '../../components/route-header/route-header';

import { useLsi } from '../../hooks/hooks';

import { CustomerListDto } from '../../types/customers-types';
import CustomersList from './customers-list/customers-list';
import { Lsi } from './lsi';

interface CustomersProps {
  customersDataList: CustomerListDto;
}

function Customers({ customersDataList }: CustomersProps) {
  const customerLsi = useLsi(Lsi);
  return (
    <Box>
      <RouteHeader
        header={customerLsi.customers}
        actionButton={
          <Elements.Button fullWidth={false} onClick={() => console.log('----->123<-----', 123)}>
            {customerLsi.addCustomer}
          </Elements.Button>
        }
      />

      <CustomersList customersDataList={customersDataList} />
    </Box>
  );
}

export default Customers;
