import Box from '@mui/material/Box';

import NoData from '../../../components/no-data/no-data';

import { useLsi } from '../../../hooks/hooks';

import { CustomerDto, CustomerListDto } from '../../../types/customers-types';
import CustomerCard from '../customer-card/customer-card';
import { Lsi } from '../lsi';

interface CustomersListProps {
  customersDataList: CustomerListDto;
}

function CustomersList({ customersDataList }: CustomersListProps) {
  const customerLsi = useLsi(Lsi);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
      {customersDataList.itemList.length ? (
        customersDataList.itemList.map((customerDataObject: CustomerDto, key) => (
          <Box key={key} sx={{ maxWidth: 280, mx: 'auto', width: '100%' }}>
            <CustomerCard customerDataObject={customerDataObject} />
          </Box>
        ))
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <NoData header={customerLsi.noCustomersAdded} subheader={customerLsi.addNewCustomer} />
        </Box>
      )}
    </Box>
  );
}

export default CustomersList;
