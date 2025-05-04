import type { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import Calls from 'services/calls';
import { Lsi } from '../../core/authentication/login/lsi';
import { useAlert, useAuthentication, useLsi } from '../hooks';

interface LoginDto {
  email: string;
  password: string;
}
interface AuthResponse {
  accessToken: string;
}

export function useLogin() {
  const lsi = useLsi(Lsi);
  const { login } = useAuthentication();
  const { addAlert } = useAlert();

  return useMutation<AuthResponse, AxiosError, LoginDto>({
    mutationFn: (data) => Calls.Auth.login(data).then((res) => res.data),
    onSuccess: (data) => {
      login(data.accessToken);
    },
    onError: (error) => {
      const status = error.response?.status;
      if (status === 401) {
        addAlert(lsi.invalidCredentials, 'error');
      } else {
        addAlert(lsi.unexpectedError, 'error');
      }
    },
    retry: false,
  });
}
