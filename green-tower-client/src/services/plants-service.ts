import { PlantCreateDto, PlantUpdateDto } from '../types/plants-types';
import { apiService } from './api-service';

export const PlantsService = {
  get: () => apiService.get('/plant/list'),
  create: (dto: PlantCreateDto) => apiService.post('/plant/create', dto),
  update: (dto: PlantUpdateDto) => apiService.post('/plant/update', dto),
};
