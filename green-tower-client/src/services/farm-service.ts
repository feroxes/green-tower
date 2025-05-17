import { apiService } from './api-service';

type FarmGetParams = {
  id: string;
};

export const FarmService = {
  get: (params: FarmGetParams) => apiService.get('/farm/get', { params }),
};
