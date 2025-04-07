import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Plant, PlantType } from '../../src/entities/plant.entity';

import { PlantListDto } from '../../src/api/dtos/plant.dto';
import { mockDto } from '../mock/mock.dtos';

import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { SortDirectionType } from '../../src/api/types/common.types';
import { ErrorResponseType, ListResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { ErrorResponse, validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('PlantList', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: PlantListDto;

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
      meta: {
        page: 0,
        size: 10,
      },
    };
  });

  describe(UseCases.plant.list, () => {
    it(`${UseCases.plant.list} - HDS`, async () => {
      await Calls.Plant.create(app, testHelper.getAccessToken);
      const res = (await Calls.Plant.list(app, testHelper.getAccessToken, dto)) as ListResponseType<Plant>;
      ValidationHelper.validateListResponse<Plant>(res.body);
    });

    it(`${UseCases.plant.list} - HDS with filters and sorters`, async () => {
      await Calls.Plant.create(app, testHelper.getAccessToken, { ...mockDto.plantCreateDto, type: PlantType.COMMON });
      const res = (await Calls.Plant.list(app, testHelper.getAccessToken, {
        ...dto,
        filters: { type: PlantType.MICROGREEN },
        sorters: { createdAt: SortDirectionType.ASC },
      })) as ListResponseType<Plant>;
      expect(res.body.itemList.length).toBe(1);
    });

    it(`${UseCases.plant.list} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('plant/list/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Plant.list(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
