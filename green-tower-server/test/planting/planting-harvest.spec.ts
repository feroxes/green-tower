import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Planting, PlantingState } from '../../src/entities/planting.entity';

import { PlantingHarvestDto } from '../../src/api/dtos/planting.dto';
import { mockDto } from '../mock/mock.dtos';

import { plantingHarvestError } from '../../src/api/errors/planting.errors';

import { ErrorResponse, ErrorResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { PlantingType } from '../../src/entities/enums/planting-type.enum';
import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('PlantingHarvest', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: PlantingHarvestDto;

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
      type: PlantingType.PLATE,
      harvestGram: 200,
      amountOfPlates: mockDto.plantingCreateDto.amountOfPlates,
    };
  });

  describe(UseCases.planting.harvest, () => {
    it(`${UseCases.planting.harvest} - HDS - plate`, async () => {
      const res = (await Calls.Planting.harvest(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Planting>;
      ValidationHelper.planting.validatePlantingState(res.body, PlantingState.HARVESTED);
    });

    it(`${UseCases.planting.harvest} - HDS - dead plate`, async () => {
      dto.amountOfPlates = 0;
      dto.amountOfDeadPlates = mockDto.plantingCreateDto.amountOfPlates;
      const res = (await Calls.Planting.harvest(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Planting>;
      ValidationHelper.planting.validatePlantingState(res.body, PlantingState.DEAD);
    });

    it(`${UseCases.planting.harvest} - HDS - cut`, async () => {
      dto.type = PlantingType.CUT;
      delete dto.amountOfPlates;

      const res = (await Calls.Planting.harvest(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Planting>;
      ValidationHelper.planting.validatePlantingState(res.body, PlantingState.HARVESTED);
    });

    it(`${UseCases.planting.harvest} - HDS - dead cut`, async () => {
      dto.type = PlantingType.CUT;
      delete dto.amountOfPlates;
      dto.harvestGram = 0;
      dto.harvestDeadGram = 200;

      const res = (await Calls.Planting.harvest(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Planting>;
      ValidationHelper.planting.validatePlantingState(res.body, PlantingState.DEAD);
    });

    it(`${UseCases.planting.harvest} - planting is in final state`, async () => {
      const finalStatePlanting = { ...testHelper.getPlanting, state: PlantingState.HARVESTED };
      await testHelper.plantingRepository.save(finalStatePlanting);

      const res = (await Calls.Planting.harvest(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      const expectedError = plantingHarvestError.PlantingIsInFinalState({ state: PlantingState.HARVESTED });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.harvest} - invalid planting type`, async () => {
      const planting = (await Calls.Planting.create(app, testHelper.getAccessToken, {
        ...mockDto.plantingCreateDto,
        plantId: testHelper.getPlant.id,
        type: PlantingType.CUT,
      })) as ObjectResponseType<Planting>;
      dto.id = planting.body.id;
      const res = (await Calls.Planting.harvest(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      const expectedError = plantingHarvestError.InvalidPlantingType();
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.harvest} - invalid amount of plates value`, async () => {
      dto.amountOfPlates = 100;
      const res = (await Calls.Planting.harvest(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      const expectedError = plantingHarvestError.InvalidAmountOfPlatesValue();
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.harvest} - invalid amount of dead plates value`, async () => {
      dto.amountOfDeadPlates = 100;
      const res = (await Calls.Planting.harvest(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      const expectedError = plantingHarvestError.InvalidAmountOfDeadPlatesValue();
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.harvest} - failed to create harvest entry`, async () => {
      const expectedError = plantingHarvestError.FailedToCreateHarvestEntry();
      jest.spyOn(testHelper.harvestEntryRepository, 'save').mockRejectedValue(new Error());
      const res = (await Calls.Planting.harvest(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.harvest} - failed to set planting state`, async () => {
      jest.restoreAllMocks();
      const expectedError = plantingHarvestError.FailedToSetPlantingState();
      jest.spyOn(testHelper.plantingRepository, 'save').mockRejectedValue(new Error());
      const res = (await Calls.Planting.harvest(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
