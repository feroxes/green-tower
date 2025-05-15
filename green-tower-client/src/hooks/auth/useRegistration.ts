import type { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import Calls from 'services/calls';
import { Lsi } from '../../core/authentication/login/lsi';
import { useAlert, useLsi } from '../hooks';
import { SignupDto } from '../../services/auth-service';

export function useRegistration(onSuccess: () => void) {
  const lsi = useLsi(Lsi);
  const { addAlert } = useAlert();

  return useMutation<{}, AxiosError, SignupDto>({
    mutationFn: (data) => Calls.Auth.signup(data).then((res) => res.data),
    onSuccess: () => onSuccess(),
    onError: (error) => {
      const status = error.response?.status;
      if (status === 409) {
        addAlert(lsi.userAlreadyExists, 'error');
      } else {
        addAlert(lsi.unexpectedError, 'error');
      }
    },
    retry: false,
  });
}
