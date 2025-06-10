import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import Calls from '../../services/calls';
import { UserDto } from '../../types/user-types';

export function usePlants() {
  const query = useQuery<UserDto, AxiosError>({
    queryKey: ['plants'],
    queryFn: () => Calls.Plants.get().then((res) => res.data),
    retry: false,
  });

  return {
    query,
    refetchOwner: query.refetch,
  };
}
