import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { HarvestEntry } from '../../src/entities/harvest-entry.entity';

import { HarvestEntryCreatePlateDto } from '../../src/api/dtos/harvest-entry.dto';
import { mockDto } from '../mock/mock.dtos';

import { harvestEntryCreatePlateError } from '../../src/api/errors/harverst-entry.errors';

import { ErrorResponse, ErrorResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('HarvestEntryCreatePlate', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: HarvestEntryCreatePlateDto;

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
      ...mockDto.harvestEntryCreatePlateDto,
      plantId: testHelper.getPlant.id,
    };
  });

  describe(UseCases.harvestEntry.createPlate, () => {
    it(`${UseCases.harvestEntry.createPlate} - HDS - plantId`, async () => {
      const res = (await Calls.HarvestEntry.createPlate(
        app,
        testHelper.getAccessToken,
        dto,
      )) as ObjectResponseType<HarvestEntry>;
      ValidationHelper.harvestEntry.validateHarvestEntryCreation(res.body, dto);
    });

    it(`${UseCases.harvestEntry.createPlate} - invalid dto`, async () => {
      dto.plantingId = testHelper.getPlanting.id;
      const expectedError = harvestEntryCreatePlateError.InvalidDto();
      const res = (await Calls.HarvestEntry.createPlate(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.harvestEntry.createPlate} - failed to create harvest entry`, async () => {
      const expectedError = harvestEntryCreatePlateError.FailedToCreateHarvestEntry({});
      jest.spyOn(testHelper.harvestEntryRepository, 'save').mockRejectedValue(new Error());
      const res = (await Calls.HarvestEntry.createPlate(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
