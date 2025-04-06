import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { PlantGetDto } from '../../src/api/dtos/plant.dto';

import { PlantComponentError } from '../../src/api/errors/plant-component.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponseType, PlantResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { ErrorResponse, validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('PlantGet', () => {
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

  describe(UseCases.plant.get, () => {
    it(`${UseCases.plant.get} - HDS`, async () => {
      const res = (await Calls.Plant.get(app, testHelper.getAccessToken, dto)) as PlantResponseType;
      ValidationHelper.plant.validatePlantGet(res.body);
    });

    it(`${UseCases.plant.get} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('plant/get/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Plant.get(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.plant.update} - plant not found`, async () => {
      const plantComponentError = new PlantComponentError('plant/get/');
      const expectedError = plantComponentError.PlantNotFound();

      dto.id = crypto.randomUUID();
      const res = (await Calls.Plant.get(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
