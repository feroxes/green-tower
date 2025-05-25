import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Plant } from '../../src/entities/plant.entity';
import { UserRole } from '../../src/entities/user.entity';

import { plantCreateError } from '../../src/api/errors/plant.errors';
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

describe('PlantCreate', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;

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
  });

  describe(UseCases.plant.create, () => {
    it(`${UseCases.plant.create} - HDS`, async () => {
      const res = (await Calls.Plant.create(app, testHelper.getAccessToken)) as ObjectResponseType<Plant>;
      ValidationHelper.plant.validatePlantCreation(res.body);

      const farm = await testHelper.loadFarm();
      const user = await testHelper.loadUser();
      expect(farm.plants.length).toBe(2);
      expect(farm.plants[1].id).toBe(res.body.id);
      expect(user.plants.length).toBe(2);
      expect(user.plants[1].id).toBe(res.body.id);
    });

    it(`${UseCases.plant.create} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('plant/create/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Plant.create(app, testHelper.getAccessTokenWithWrongOwner)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.plant.create} - forbidden (call by USER)`, async () => {
      const { accessToken } = await testHelper.createUser(UserRole.USER);

      const res = (await Calls.Plant.create(app, accessToken)) as GuardErrorResponseType;
      validateOwnerGuard(res.body);
    });

    it(`${UseCases.plant.create} - failed to create a plant`, async () => {
      const expectedError = plantCreateError.FailedToCreatePlant();
      jest.spyOn(testHelper.plantRepository, 'save').mockRejectedValue(new Error());
      const res = (await Calls.Plant.create(app, testHelper.getAccessToken)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
