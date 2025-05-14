import { apiService } from './api-service';
import { LoginFormInputs } from '../core/authentication/login/login-form-view';
import { RegistrationFormInputs } from '../core/authentication/registration/registration-form-view';

type SignupDto = Omit<RegistrationFormInputs, 'confirmPassword'>;
type ResendConfirmationEmailDto = { email: string };

export const AuthService = {
  login: (dto: LoginFormInputs) => apiService.post<{ accessToken: string }>('/auth/login', dto),
  signup: (dto: SignupDto) => apiService.post('/auth/signup', dto),
  refresh: () => apiService.post('/auth/refresh'),
  resendConfirmationEmail: (dto: ResendConfirmationEmailDto) => apiService.post('/auth/resendConfirmationEmail', dto),
};
