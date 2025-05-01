import { AuthService } from './auth-service';
import { apiService } from './api-service';

const Calls = {
  Auth: AuthService,
  User: {
    get: () => apiService.get<{ accessToken: string }>('/user/get'),
  },
};

export default Calls;
