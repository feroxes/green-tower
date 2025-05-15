import { apiService } from './api-service';
import { LoginFormInputs } from '../core/authentication/login/login-form-view';
import { RegistrationFormInputs } from '../core/authentication/registration/registration-form-view';
import { SupportedLanguages } from '../types/types';

export type SignupDto = Omit<RegistrationFormInputs, 'confirmPassword'> & {
  language: SupportedLanguages;
};
type ResendConfirmationEmailDto = { email: string; language: string };

export const AuthService = {
  login: (dto: LoginFormInputs) => apiService.post<{ accessToken: string }>('/auth/login', dto),
  signup: (dto: SignupDto) => apiService.post('/auth/signup', dto),
  refresh: () => apiService.post('/auth/refresh'),
  resendConfirmationEmail: (dto: ResendConfirmationEmailDto) => apiService.post('/auth/resendConfirmationEmail', dto),
  confirmEmail: (token: string) => apiService.get(`/auth/confirmEmail/${token}`),
};
