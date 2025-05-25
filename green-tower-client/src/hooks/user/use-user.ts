import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useAlert, useLsi } from '../hooks';

import { Lsi } from '../../core/authentication/login/lsi';
import Calls from '../../services/calls';
import { UpdateUserDtoType, UserDto } from '../../types/user-types';

export function useOwner() {
  const lsi = useLsi(Lsi);
  const { addAlert } = useAlert();
  const queryClient = useQueryClient();

  const query = useQuery<UserDto, AxiosError>({
    queryKey: ['owner'],
    queryFn: () => Calls.User.get().then((res) => res.data),
    retry: false,
  });

  const updateMutation = useMutation<UserDto, AxiosError, UpdateUserDtoType>({
    mutationFn: (dto) => Calls.User.update(dto).then((res) => res.data),
    onSuccess: (updatedOwner) => {
      queryClient.setQueryData(['owner'], updatedOwner);
    },
    onError: () => {
      addAlert(lsi.unexpectedError, 'error');
    },
  });

  return {
    query,
    refetchOwner: query.refetch,
    updateOwner: updateMutation.mutate,
  };
}
