import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Plant } from '../../src/entities/plant.entity';
import { Planting, PlantingState } from '../../src/entities/planting.entity';

import { PlantingUpdateDto } from '../../src/api/dtos/planting.dto';
import { mockDto } from '../mock/mock.dtos';

import { PlantComponentError } from '../../src/api/errors/plant-component.errors';
import { plantingUpdateError } from '../../src/api/errors/planting.errors';
import { PlantingComponentError } from '../../src/api/errors/planting-component.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('PlantingUpdate', () => {
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
    dto = {
      id: testHelper.planting.id,
      ...mockDto.plantingUpdateDto,
    };
  });

  describe(UseCases.planting.update, () => {
    it(`${UseCases.planting.update} - HDS`, async () => {
      const res = (await Calls.Planting.update(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Planting>;
      ValidationHelper.planting.validatePlantingUpdate(res.body, dto);
    });

    it(`${UseCases.planting.update} - harvestTs update on plant change`, async () => {
      const newPlant = (await Calls.Plant.create(app, testHelper.getAccessToken)) as ObjectResponseType<Plant>;
      const updateDto = {
        ...dto,
        plantId: newPlant.body.id,
      };

      const res = (await Calls.Planting.update(
        app,
        testHelper.getAccessToken,
        updateDto,
      )) as ObjectResponseType<Planting>;
      const planting = res.body;

      const expectedHarvestTs = new Date();
      expectedHarvestTs.setHours(expectedHarvestTs.getHours() + newPlant.body.expectedHoursToHarvest);

      expect(planting.harvestTs).toBeDefined();
      expect(new Date(planting.harvestTs).getTime()).toBeCloseTo(expectedHarvestTs.getTime(), -2);
    });

    it(`${UseCases.planting.update} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('planting/update/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Planting.update(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.update} - planting not found`, async () => {
      const plantingComponentError = new PlantingComponentError('planting/update/');
      const expectedError = plantingComponentError.PlantingNotFound();

      const res = (await Calls.Planting.update(app, testHelper.getAccessToken, {
        ...dto,
        id: testHelper.getRandomId(),
      })) as ErrorResponseType;

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.update} - planting is not in GROWING state`, async () => {
      const nonGrowingPlanting = { ...testHelper.getPlanting, state: PlantingState.HARVESTED };
      await testHelper.plantingRepository.save(nonGrowingPlanting);

      const res = (await Calls.Planting.update(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      const expectedError = plantingUpdateError.PlantingIsNotInProperState({ state: PlantingState.HARVESTED });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.update} - plant not found`, async () => {
      const plantComponentError = new PlantComponentError('planting/update/');
      const expectedError = plantComponentError.PlantNotFound();

      const res = (await Calls.Planting.update(app, testHelper.getAccessToken, {
        ...dto,
        plantId: testHelper.getRandomId(),
      })) as ErrorResponseType;

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.update} - failed to create a planting`, async () => {
      const expectedError = plantingUpdateError.FailedToUpdatePlanting();
      jest.spyOn(testHelper.plantingRepository, 'save').mockRejectedValue(new Error());
      const res = (await Calls.Planting.update(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
