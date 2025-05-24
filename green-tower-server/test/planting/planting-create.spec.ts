import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Planting } from '../../src/entities/planting.entity';

import { PlantingCreateDto } from '../../src/api/dtos/planting.dto';
import { mockDto } from '../mock/mock.dtos';

import { plantingCreateError } from '../../src/api/errors/planting.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('PlantingCreate', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: PlantingCreateDto;

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
      ...mockDto.plantingCreateDto,
      plantId: testHelper.getPlant.id,
    };
  });

  describe(UseCases.planting.create, () => {
    it(`${UseCases.planting.create} - HDS`, async () => {
      const res = (await Calls.Planting.create(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Planting>;
      ValidationHelper.planting.validatePlantingCreation(res.body);

      const farm = await testHelper.loadFarm();
      const user = await testHelper.loadUser();
      expect(farm.plantings.length).toBe(2);
      expect(farm.plantings[1].id).toBe(res.body.id);
      expect(user.plantings.length).toBe(2);
      expect(user.plantings[1].id).toBe(res.body.id);
    });

    it(`${UseCases.planting.create} - harvestTs calculation`, async () => {
      const res = (await Calls.Planting.create(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Planting>;
      const planting = res.body;

      const expectedHarvestTs = new Date();
      expectedHarvestTs.setHours(expectedHarvestTs.getHours() + planting.plant.expectedHoursToHarvest);

      expect(planting.harvestTs).toBeDefined();
      expect(new Date(planting.harvestTs).getTime()).toBeCloseTo(expectedHarvestTs.getTime(), -2);
    });

    it(`${UseCases.planting.create} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('planting/create/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Planting.create(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.create} - failed to create a planting`, async () => {
      const expectedError = plantingCreateError.FailedToCreatePlanting();
      jest.spyOn(testHelper.plantingRepository, 'save').mockRejectedValue(new Error());
      const res = (await Calls.Planting.create(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
