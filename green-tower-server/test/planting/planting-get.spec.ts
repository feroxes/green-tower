import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Planting } from '../../src/entities/planting.entity';

import { PlantingUpdateDto } from '../../src/api/dtos/planting.dto';

import { PlantingComponentError } from '../../src/api/errors/planting-component.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('PlantingGet', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: PlantingUpdateDto;

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
    dto = { id: testHelper.planting.id };
  });

  describe(UseCases.planting.get, () => {
    it(`${UseCases.planting.get} - HDS`, async () => {
      const res = (await Calls.Planting.get(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Planting>;
      ValidationHelper.planting.validatePlantingGet(res.body);
    });

    it(`${UseCases.planting.get} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('planting/get/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Planting.get(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.get} - planting not found`, async () => {
      const plantingComponentError = new PlantingComponentError('planting/get/');
      const expectedError = plantingComponentError.PlantingNotFound();

      const res = (await Calls.Planting.get(app, testHelper.getAccessToken, {
        id: testHelper.getRandomId(),
      })) as ErrorResponseType;

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
