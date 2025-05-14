import type { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import Calls from 'services/calls';
import { Lsi } from '../../core/authentication/login/lsi';
import { useAlert, useAuthentication, useLsi } from '../hooks';
import { LoginFormInputs } from '../../core/authentication/login/login-form-view';
import { Constants } from '../../utils/constants';

interface AuthResponse {
  accessToken: string;
}

interface AuthErrorResponse {
  errorCode: string;
  message?: string;
}

export function useLogin() {
  const lsi = useLsi(Lsi);
  const { login } = useAuthentication();
  const { addAlert } = useAlert();

  return useMutation<AuthResponse, AxiosError, LoginFormInputs>({
    mutationFn: (data) => Calls.Auth.login(data).then((res) => res.data),
    onSuccess: (data) => {
      login(data.accessToken);
    },
    onError: (error) => {
      const status = error.response?.status;
      const data = error.response?.data as AuthErrorResponse;

      if (status === 401) {
        if (data?.errorCode === Constants.errorCodes.Auth.emailNotConfirmed) {
          addAlert(lsi.emailNotConfirmed, 'error');
        } else {
          addAlert(lsi.invalidCredentials, 'error');
        }
      } else {
        addAlert(lsi.unexpectedError, 'error');
      }
    },
    retry: false,
  });
}
