import { Farm } from '../../src/entities/farm.entity';
import { Plant } from '../../src/entities/plant.entity';
import { Planting, PlantingState } from '../../src/entities/planting.entity';
import { User, UserRole } from '../../src/entities/user.entity';

import { PlantUpdateDto } from '../../src/api/dtos/plant.dto';
import { PlantingUpdateDto } from '../../src/api/dtos/planting.dto';
import { mockDto } from '../mock/mock.dtos';

import { ErrorResponse, GuardError } from './types/response.types';

import { ListResponseType } from '../../src/api/types/dto-types';

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
  validateSuccessResponse(response: Response) {
    expect([200, 201]).toContain(response.status);
  },
  validateListResponse<T>(body: ListResponseType<T>) {
    expect(body).toBeDefined();
    expect(body.itemList).toBeDefined();
    expect(body.meta).toBeDefined();
    expect(body.meta.page).toBeDefined();
    expect(body.meta.size).toBeDefined();
    expect(body.meta.total).toBeDefined();
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
    validateUserGet(user: User) {
      expect(user).toBeDefined();
      expect(user).not.toBeNull();
    },
  },
  plant: {
    validatePlantCreation(plant: Plant, mockPlantCreateDto = mockDto.plantCreateDto) {
      expect(plant).toBeDefined();
      expect(plant.createdBy).toBeDefined();
      expect(plant.farm).toBeDefined();
      expect(plant.sellPricePerGram).toBeDefined();
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
      expect(plant.sellPricePerPlate).toBe(mockPlantCreateDto.sellPricePerPlate);
      expect(plant.isDeleted).toBe(false);
    },
    validatePlantUpdate(plant: Plant, mockPlantUpdateDto: PlantUpdateDto) {
      expect(plant).toBeDefined();
      expect(plant).not.toBeNull();
      for (const key in mockPlantUpdateDto) {
        expect(mockPlantUpdateDto[key]).toBe(plant[key]);
      }
    },
    validatePlantGet(plant: Plant) {
      expect(plant).toBeDefined();
      expect(plant).not.toBeNull();
    },
  },
  planting: {
    validatePlantingCreation(planting: Planting, mockPlantingCreateDto = mockDto.plantingCreateDto) {
      expect(planting).toBeDefined();
      expect(planting.createdBy).toBeDefined();
      expect(planting.farm).toBeDefined();
      expect(planting.plant).toBeDefined();
      expect(planting.state).toBeDefined();
      expect(planting.state).toBe(PlantingState.GROWING);
      expect(planting.notes).toBe(mockPlantingCreateDto.notes);
      expect(planting.amountOfPlates).toBe(mockPlantingCreateDto.amountOfPlates);
      expect(planting.amountOfGramsOfSeeds).toBe(mockPlantingCreateDto.amountOfGramsOfSeeds);
      expect(planting.expectedHarvestTs).toBeDefined();
      const expectedHarvestTs = new Date();
      expectedHarvestTs.setHours(expectedHarvestTs.getHours() + planting.plant.expectedHoursToHarvest);
      expect(new Date(planting.expectedHarvestTs).getTime()).toBeCloseTo(expectedHarvestTs.getTime(), -2);
    },
    validatePlantingUpdate(planting: Planting, mockPlantingUpdateDto: PlantingUpdateDto) {
      expect(planting).toBeDefined();
      expect(planting).not.toBeNull();
      for (const key in mockPlantingUpdateDto) {
        if (key === 'plantId') {
          const expectedHarvestTs = new Date();
          expectedHarvestTs.setHours(expectedHarvestTs.getHours() + planting.plant.expectedHoursToHarvest);
          expect(new Date(planting.expectedHarvestTs).getTime()).toBeCloseTo(expectedHarvestTs.getTime(), -2);
        } else {
          expect(mockPlantingUpdateDto[key]).toBe(planting[key]);
        }
      }
    },
    validatePlantingGet(planting: Planting) {
      expect(planting).toBeDefined();
      expect(planting).not.toBeNull();
      expect(planting.expectedHarvestTs).toBeDefined();
    },
    validatePlantingState(planting: Planting, expectedState: PlantingState): void {
      expect(planting.state).toBe(expectedState);
      if (planting.state === PlantingState.HARVESTED) {
        expect(planting.harvestTs).toBeDefined();
      }
      if (planting.state === PlantingState.DEAD) {
        expect(planting.deadTs).toBeDefined();
      }
    },
  },
};
