import { mockDto } from '../mock/mock.dtos';
import { Farm } from '../../src/entities/farm.entity';
import { User, UserRole } from '../../src/entities/user.entity';
import { LoginOrRegistrationResponseBodyType } from './types/auth.types';

export interface ErrorResponse {
  errorCode: string;
  message: string;
}

export function validateError(error: ErrorResponse, expectedError: ErrorResponse) {
  expect(error.errorCode).toEqual(expectedError.errorCode);
  expect(error.message).toEqual(expectedError.message);
}

export function validateOwnerGuard(error: { statusCode: number; error: string; message: string }): void {
  expect(error.statusCode).toEqual(403);
  expect(error.error).toEqual('Forbidden');
  expect(error.message).toEqual('Forbidden resource');
}

export const ValidationHelper = {
  auth: {
    validateDto: (body: LoginOrRegistrationResponseBodyType) => {
      expect(body).toHaveProperty('accessToken');
      expect(body.accessToken).toBeDefined();
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
    validateUserRegistration: (user: User, farm: Partial<Farm>, mockAuthRegisterDto = mockDto.authRegisterDto) => {
      expect(user).toBeDefined();
      expect(user).not.toBeNull();
      expect(user.firstName).toBe(mockAuthRegisterDto.firstName);
      expect(user.lastName).toBe(mockAuthRegisterDto.lastName);
      expect(user.email).toBe(mockAuthRegisterDto.email);
      expect(user.role).toBe(UserRole.OWNER);
      expect(user.farm.id).toBe(farm.id);
    },
    validateUserCreation(user: Partial<User>, mockUserCreateDto = mockDto.getUserCreateDto()) {
      expect(user).toBeDefined();
      expect(user).not.toBeNull();
      expect(user.firstName).toBe(mockUserCreateDto.firstName);
      expect(user.lastName).toBe(mockUserCreateDto.lastName);
      expect(user.email).toBe(mockUserCreateDto.email);
      expect(user.role).toBe(mockUserCreateDto.role);
    },
  },
};
