import { apiService } from './api-service';

export const PlantsService = {
  get: () => apiService.get('/plant/list'),
};
