import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useAuthentication } from '../hooks';

import Calls from '../../services/calls';

export function useLogout() {
  const { logout } = useAuthentication();

  return useQuery<{}, AxiosError>({
    queryKey: ['logout'],
    queryFn: () =>
      Calls.Auth.logout().then((res) => {
        logout();
        return res.data;
      }),
    retry: false,
    enabled: false,
  });
}
