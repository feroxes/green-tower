import { useQuery } from '@tanstack/react-query';

import Calls from '../../services/calls';
import { CustomerDto } from '../../types/customers-types';

export function useCustomers() {
  const query = useQuery<CustomerDto[]>({
    queryKey: ['customers'],
    queryFn: () => Calls.Customers.list().then((res) => res.data),
    retry: false,
  });

  return { query };
}
