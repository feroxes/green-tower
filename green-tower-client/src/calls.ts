import { api } from 'api/api';

const Calls = {
  Auth: {
    login: (dto: { email: string; password: string }) => api.post<{ accessToken: string }>('/auth/login', dto),
    signup: (dto: { email: string; password: string; farmName: string }) => api.post('/auth/signup', dto),
  },
  User: {
    get: () => api.get<{ accessToken: string }>('/user/get'),
  },
};

export default Calls;
