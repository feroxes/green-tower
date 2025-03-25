import { Farm } from '../../src/entities/farm.entity';
import { Plant } from '../../src/entities/plant.entity';
import { User, UserRole } from '../../src/entities/user.entity';

import { mockDto } from '../mock/mock.dtos';

export interface ErrorResponse {
  errorCode: string;
  message: string;
}

export interface GuardError {
  statusCode: number;
  error: string;
  message: string;
}

export function validateError(error: ErrorResponse, expectedError: ErrorResponse) {
  expect(error.errorCode).toEqual(expectedError.errorCode);
  expect(error.message).toEqual(expectedError.message);
}

export function validateOwnerGuard(error: GuardError): void {
  expect(error.statusCode).toEqual(403);
  expect(error.error).toEqual('Forbidden');
  expect(error.message).toEqual('Forbidden resource');
}

export const ValidationHelper = {
  validateSuccessRequest(response: Response) {
    expect([200, 201]).toContain(response.status);
  },
  auth: {
    validateDto: (body: { accessToken: string }) => {
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
      expect(user.emailConfirmationToken).toBeDefined();
      expect(user.emailConfirmationExpires).toBeDefined();
      expect(user.isEmailConfirmed).toBe(false);
      expect(user).not.toBeNull();
      expect(user.firstName).toBe(mockUserCreateDto.firstName);
      expect(user.lastName).toBe(mockUserCreateDto.lastName);
      expect(user.email).toBe(mockUserCreateDto.email);
      expect(user.role).toBe(mockUserCreateDto.role);
    },
    validateUserUpdate(user: User, mockUserUpdateDto = mockDto.userUpdateDto) {
      expect(user).toBeDefined();
      expect(user).not.toBeNull();
      for (const key in mockUserUpdateDto) {
        expect(user[key]).toBe(mockUserUpdateDto[key]);
      }
    },
  },
  plant: {
    validatePlantCreation(plant: Plant, mockPlantCreateDto = mockDto.plantCreateDto) {
      expect(plant).toBeDefined();
      expect(plant.createdBy).toBeDefined();
      expect(plant.farm).toBeDefined();
      expect(plant).not.toBeNull();
      expect(plant.name).toBe(mockPlantCreateDto.name);
      expect(plant.description).toBe(mockPlantCreateDto.description);
      expect(plant.notes).toBe(mockPlantCreateDto.notes);
      expect(plant.imageUrl).toBe(mockPlantCreateDto.imageUrl);
      expect(plant.type).toBe(mockPlantCreateDto.type);
      expect(plant.expectedHoursToHarvest).toBe(mockPlantCreateDto.expectedHoursToHarvest);
      expect(plant.hoursToSoak).toBe(mockPlantCreateDto.hoursToSoak);
      expect(plant.hoursToMoveToLight).toBe(mockPlantCreateDto.hoursToMoveToLight);
      expect(plant.shouldBePressed).toBe(mockPlantCreateDto.shouldBePressed);
      expect(plant.seedsGramPerPlate).toBe(mockPlantCreateDto.seedsGramPerPlate);
      expect(plant.expectedHarvestGramsPerPlate).toBe(mockPlantCreateDto.expectedHarvestGramsPerPlate);
    },
  },
};
