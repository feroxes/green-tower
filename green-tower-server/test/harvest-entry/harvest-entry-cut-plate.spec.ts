import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { HarvestEntry } from '../../src/entities/harvest-entry.entity';
import { Planting } from '../../src/entities/planting.entity';

import { HarvestEntryCutPlateDto } from '../../src/api/dtos/harvest-entry.dto';
import { mockDto } from '../mock/mock.dtos';

import { harvestEntryCutPlateError } from '../../src/api/errors/harverst-entry.errors';

import { ErrorResponse, ErrorResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { PlantingType } from '../../src/entities/enums/planting-type.enum';
import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('HarvestEntryCutPlate', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: HarvestEntryCutPlateDto;

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
      ...mockDto.harvestEntryCutPlateDto,
    };
    const harvestEntry = await testHelper.createHarvestEntry();
    dto.harvestEntryId = harvestEntry.id;
  });

  describe(UseCases.harvestEntry.cutPlate, () => {
    it(`${UseCases.harvestEntry.cutPlate} - HDS - full cut`, async () => {
      const res = (await Calls.HarvestEntry.cutPlate(
        app,
        testHelper.getAccessToken,
        dto,
      )) as ObjectResponseType<HarvestEntry>;
      ValidationHelper.harvestEntry.validateHarvestEntryCutPlate(res.body, dto);

      const harvestEntry = await testHelper.harvestEntryRepository.findOne({ where: { id: dto.harvestEntryId } });
      expect(harvestEntry).toBeNull();
    });

    it(`${UseCases.harvestEntry.cutPlate} - HDS - partial cut`, async () => {
      dto.amountOfPlates = 5;
      const res = (await Calls.HarvestEntry.cutPlate(
        app,
        testHelper.getAccessToken,
        dto,
      )) as ObjectResponseType<HarvestEntry>;
      ValidationHelper.harvestEntry.validateHarvestEntryCutPlate(res.body, dto);
      const harvestEntry = await testHelper.harvestEntryRepository.findOne({ where: { id: dto.harvestEntryId } });
      expect(harvestEntry).not.toBeNull();
    });

    it(`${UseCases.harvestEntry.cutPlate} - InvalidHarvestEntryType`, async () => {
      const expectedError = harvestEntryCutPlateError.InvalidHarvestEntryType();

      let planting = (await Calls.Planting.create(app, testHelper.getAccessToken, {
        ...mockDto.plantingCreateDto,
        type: PlantingType.CUT,
        plantId: testHelper.getPlant.id,
      })) as ObjectResponseType<Planting>;

      planting = (await Calls.Planting.harvest(app, testHelper.getAccessToken, {
        id: planting.body.id,
        type: PlantingType.CUT,
        harvestGram: 200,
        amountOfPlates: mockDto.plantingCreateDto.amountOfPlates,
      })) as ObjectResponseType<Planting>;

      const harvestEntry = await testHelper.harvestEntryRepository.findOne({
        where: { planting: { id: planting.body.id } },
      });
      dto.harvestEntryId = harvestEntry!.id;

      const res = (await Calls.HarvestEntry.cutPlate(app, testHelper.getAccessToken, dto)) as ErrorResponseType;

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.harvestEntry.cutPlate} - NotEnoughPlates`, async () => {
      const expectedError = harvestEntryCutPlateError.NotEnoughPlates();
      dto.amountOfPlates = 100;
      const res = (await Calls.HarvestEntry.cutPlate(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.harvestEntry.cutPlate} - NotEnoughPlates`, async () => {
      const expectedError = harvestEntryCutPlateError.FailedToCutPlate();
      jest.spyOn(testHelper.harvestEntryRepository, 'remove').mockRejectedValue(new Error());
      const res = (await Calls.HarvestEntry.cutPlate(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
