import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useAlert, useLsi } from '../hooks';

import { Lsi } from '../../core/authentication/login/lsi';
import { SignupDto } from '../../services/auth-service';
import Calls from '../../services/calls';

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
