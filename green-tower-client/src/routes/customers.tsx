import DataStateResolver from '../components/data-state-resolver/data-state-resolver';

import { useCustomers } from '../hooks/customers/use-customers';

import Customers from '../core/customers/customers';
import { CustomerListDto } from '../types/customers-types';

function CustomersRoute() {
  const { query } = useCustomers();

  return (
    <DataStateResolver query={query}>
      {({ data }) => {
        return <Customers customersDataList={data as CustomerListDto} />;
      }}
    </DataStateResolver>
  );
}

export default CustomersRoute;
