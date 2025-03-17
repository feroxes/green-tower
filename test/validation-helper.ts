import { mockDto } from './mock/mock.dtos';
import { Farm } from '../src/entities/farm.entity';
import { User, UserRole } from '../src/entities/user.entity';

export type ResponseType = {
  accessToken: string;
};

export const ValidationHelper = {
  auth: {
    validateResponse: (response: ResponseType) => {
      expect(response).toHaveProperty('accessToken');
      expect(response.accessToken).toBeDefined();
    },
  },
  farm: {
    validateFarm: (farm: Partial<Farm>, mockAuthRegisterDto = mockDto.authRegisterDto) => {
      expect(farm).toBeDefined();
      expect(farm).not.toBeNull();
      expect(farm.name).toBe(mockAuthRegisterDto.farmName);
    },
  },
  user: {
    validateUser: (user: User, farm: Partial<Farm>, mockAuthRegisterDto = mockDto.authRegisterDto) => {
      expect(user).toBeDefined();
      expect(user).not.toBeNull();
      expect(user.firstName).toBe(mockAuthRegisterDto.firstName);
      expect(user.lastName).toBe(mockAuthRegisterDto.lastName);
      expect(user.email).toBe(mockAuthRegisterDto.email);
      expect(user.role).toBe(UserRole.ADMIN);
      expect(user.farm.id).toBe(farm.id);
    },
  },
};
