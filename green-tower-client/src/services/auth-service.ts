import { apiService } from './api-service';

export const AuthService = {
  login: (dto: { email: string; password: string }) => apiService.post<{ accessToken: string }>('/auth/login', dto),
  signup: (dto: { email: string; password: string; farmName: string }) => apiService.post('/auth/signup', dto),
  refresh: () => apiService.post('/auth/refresh'),
};
