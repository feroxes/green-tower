import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { PlantingDeleteDto } from '../../src/api/dtos/planting.dto';

import { plantingDeleteError } from '../../src/api/errors/planting.errors';
import { PlantingComponentError } from '../../src/api/errors/planting-component.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('PlantingDelete', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: PlantingDeleteDto;

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

  describe(UseCases.planting.delete, () => {
    it(`${UseCases.planting.delete} - HDS`, async () => {
      const res = (await Calls.Planting.delete(app, testHelper.getAccessToken, dto)) as Response;
      ValidationHelper.validateSuccessResponse(res);
    });

    it(`${UseCases.planting.delete} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('planting/delete/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Planting.delete(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.delete} - planting not found`, async () => {
      const plantingComponentError = new PlantingComponentError('planting/delete/');
      const expectedError = plantingComponentError.PlantingNotFound();

      const res = (await Calls.Planting.delete(app, testHelper.getAccessToken, {
        id: testHelper.getRandomId(),
      })) as ErrorResponseType;

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.delete} - failed to delete a planting`, async () => {
      const expectedError = plantingDeleteError.FailedToDeletePlanting();
      jest.spyOn(testHelper.plantingRepository, 'delete').mockRejectedValue(new Error());
      const res = (await Calls.Planting.delete(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
