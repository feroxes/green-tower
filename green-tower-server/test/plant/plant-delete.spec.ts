import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { PlantGetDto } from '../../src/api/dtos/plant.dto';

import { plantDeleteError } from '../../src/api/errors/plant.errors';
import { PlantComponentError } from '../../src/api/errors/plant-component.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('PlantDelete', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: PlantGetDto;

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
    dto = { id: testHelper.plant.id };
  });

  describe(UseCases.plant.delete, () => {
    it(`${UseCases.plant.delete} - HDS`, async () => {
      const res = (await Calls.Plant.delete(app, testHelper.getAccessToken, dto)) as Response;
      const farm = await testHelper.getFarm();
      const user = await testHelper.getUser();

      ValidationHelper.validateSuccessResponse(res);
      expect(farm.plants.length).toBe(0);
      expect(user.plants.length).toBe(0);
    });

    it(`${UseCases.plant.delete} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('plant/delete/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Plant.delete(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.plant.delete} - plant not found`, async () => {
      const plantComponentError = new PlantComponentError('plant/delete/');
      const expectedError = plantComponentError.PlantNotFound();

      dto.id = crypto.randomUUID();
      const res = (await Calls.Plant.delete(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.delete} - failed to delete a plant`, async () => {
      jest.spyOn(testHelper.plantRepository, 'remove').mockRejectedValue(new Error());
      const expectedError = plantDeleteError.FailedToDeletePlant();
      const res = (await Calls.Plant.delete(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
