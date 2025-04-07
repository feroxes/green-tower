import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Plant } from '../../src/entities/plant.entity';
import { UserRole } from '../../src/entities/user.entity';

import { PlantUpdateDto } from '../../src/api/dtos/plant.dto';
import { mockDto } from '../mock/mock.dtos';

import { plantUpdateError } from '../../src/api/errors/plant.errors';
import { PlantComponentError } from '../../src/api/errors/plant-component.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import {
  ErrorResponse,
  ErrorResponseType,
  GuardErrorResponseType,
  ObjectResponseType,
} from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, validateOwnerGuard, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('PlantUpdate', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: PlantUpdateDto;

  beforeAll(async () => {
    const testConfig = await init();
    app = testConfig.app;
    module = testConfig.module;
  });

  afterAll(async () => {
    await closeDatabaseConnection(module);
  });

  beforeEach(async () => {
    await clearDatabase(module);
    testHelper = new TestHelper(app, module);
    await testHelper.init();
    dto = {
      id: testHelper.plant.id,
      ...mockDto.plantUpdateDto,
    };
  });

  describe(UseCases.plant.update, () => {
    it(`${UseCases.plant.update} - HDS`, async () => {
      const res = (await Calls.Plant.update(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Plant>;
      ValidationHelper.plant.validatePlantUpdate(res.body, dto);
    });

    it(`${UseCases.plant.update} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('plant/update/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Plant.update(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.plant.update} - forbidden (call by USER)`, async () => {
      const { accessToken } = await testHelper.createUser(UserRole.USER);

      const res = (await Calls.Plant.update(app, accessToken, dto)) as GuardErrorResponseType;
      validateOwnerGuard(res.body);
    });

    it(`${UseCases.plant.update} - plant not found`, async () => {
      const plantComponentError = new PlantComponentError('plant/update/');
      const expectedError = plantComponentError.PlantNotFound();

      dto.id = crypto.randomUUID();
      const res = (await Calls.Plant.update(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.plant.update} - failed to create a plant`, async () => {
      const expectedError = plantUpdateError.FailedToUpdatePlant();
      jest.spyOn(testHelper.plantRepository, 'save').mockRejectedValue(new Error());
      const res = (await Calls.Plant.update(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
