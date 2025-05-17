import { UpdateUserDtoType } from '../types/user-types';
import { apiService } from './api-service';

export const UserService = {
  get: () => apiService.get('/user/get'),
  update: (dto: UpdateUserDtoType) => apiService.post('/user/update', dto),
};
