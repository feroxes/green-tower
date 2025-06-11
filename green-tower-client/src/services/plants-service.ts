import { PlantCreateDto } from '../types/plants-types';
import { apiService } from './api-service';

export const PlantsService = {
  get: () => apiService.get('/plant/list'),
  create: (dto: PlantCreateDto) => apiService.post('/plant/create', dto),
};
