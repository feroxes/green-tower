import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Planting, PlantingState } from '../../src/entities/planting.entity';

import { PlantingComponentError } from '../../src/api/errors/planting-component.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType, ListResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('PlantingList', () => {
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

  describe(UseCases.planting.list, () => {
    it(`${UseCases.planting.list} - HDS`, async () => {
      const res = (await Calls.Planting.list(app, testHelper.getAccessToken, {})) as ListResponseType<Planting>;

      expect(res.body.itemList.length).toBe(1);
      expect(res.body.meta.total).toBe(1);
      expect(res.body.itemList[0].state).toBe(PlantingState.GROWING);
    });

    it(`${UseCases.planting.list} - filter by state`, async () => {
      const res = (await Calls.Planting.list(app, testHelper.getAccessToken, {
        filters: { state: PlantingState.GROWING },
      })) as ListResponseType<Planting>;

      expect(res.body.itemList.length).toBe(1);
      expect(res.body.meta.total).toBe(1);
      expect(res.body.itemList[0].state).toBe(PlantingState.GROWING);
    });

    it(`${UseCases.planting.list} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('planting/list/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Planting.list(app, testHelper.getAccessTokenWithWrongOwner, {})) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
