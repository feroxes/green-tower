import { apiService } from './api-service';
import { AuthService } from './auth-service';

const Calls = {
  Auth: AuthService,
  User: {
    get: () => apiService.get<{ accessToken: string }>('/user/get'),
  },
};

export default Calls;
