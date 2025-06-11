import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { Lsi } from '../../core/plants/lsi';
import Calls from '../../services/calls';
import { PlantCreateDto, PlantDto, PlantListDto } from '../../types/plants-types';
import { useAlert } from '../common/use-alert';
import { useLsi } from '../common/use-lsi';

export function usePlants() {
  const lsi = useLsi(Lsi);
  const { addAlert } = useAlert();
  const queryClient = useQueryClient();

  const query = useQuery<PlantListDto, AxiosError>({
    queryKey: ['plants'],
    queryFn: () => Calls.Plants.get().then((res) => res.data),
    retry: false,
  });

  const createMutation = useMutation<PlantDto, AxiosError, PlantCreateDto>({
    mutationFn: (dto) => Calls.Plants.create(dto).then((res) => res.data),
    onSuccess: (createdPlant) => {
      addAlert(lsi.successfullyCreated, 'success');
      queryClient.setQueryData<PlantListDto>(['plants'], (oldData) => {
        if (!oldData) {
          return { itemList: [createdPlant], meta: { total: 1, page: 0, size: 1 } };
        }
        return {
          ...oldData,
          itemList: [createdPlant, ...oldData.itemList],
        };
      });
    },
    onError: () => {
      addAlert(lsi.unexpectedError, 'error');
    },
  });

  return {
    query,
    refetchPlants: query.refetch,
    createPlant: createMutation.mutateAsync,
    isPending: query.isPending || createMutation.isPending,
  };
}
