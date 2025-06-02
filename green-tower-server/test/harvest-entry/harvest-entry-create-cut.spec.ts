import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { HarvestEntry } from '../../src/entities/harvest-entry.entity';

import { HarvestEntryCreateCutDto } from '../../src/api/dtos/harvest-entry.dto';
import { mockDto } from '../mock/mock.dtos';

import { harvestEntryCreateCutError } from '../../src/api/errors/harverst-entry.errors';

import { ErrorResponse, ErrorResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('HarvestEntryCreateCut', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: HarvestEntryCreateCutDto;

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
      ...mockDto.harvestEntryCreateCutDto,
      plantId: testHelper.getPlant.id,
    };
  });

  describe(UseCases.harvestEntry.createCut, () => {
    it(`${UseCases.harvestEntry.createCut} - HDS - plantId`, async () => {
      const res = (await Calls.HarvestEntry.createCut(
        app,
        testHelper.getAccessToken,
        dto,
      )) as ObjectResponseType<HarvestEntry>;
      ValidationHelper.harvestEntry.validateHarvestEntryCreation(res.body, dto);

      const farm = await testHelper.loadFarm();
      expect(farm.harvestEntries.length).toBe(1);
    });

    it(`${UseCases.harvestEntry.createCut} - invalid dto`, async () => {
      dto.plantingId = testHelper.getPlanting.id;
      const expectedError = harvestEntryCreateCutError.InvalidDto();
      const res = (await Calls.HarvestEntry.createCut(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.harvestEntry.createCut} - failed to create harvest entry`, async () => {
      const expectedError = harvestEntryCreateCutError.FailedToCreateHarvestEntry({});
      jest.spyOn(testHelper.harvestEntryRepository, 'save').mockRejectedValue(new Error());
      const res = (await Calls.HarvestEntry.createCut(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
