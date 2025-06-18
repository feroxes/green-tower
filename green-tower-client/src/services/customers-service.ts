import { apiService } from './api-service';

export const CustomersService = {
  list: () => apiService.get('/customer/list'),
};
