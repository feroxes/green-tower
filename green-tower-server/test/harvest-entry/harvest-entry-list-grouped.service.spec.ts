import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { HarvestEntry } from '../../src/entities/harvest-entry.entity';
import { Plant } from '../../src/entities/plant.entity';
import { Planting } from '../../src/entities/planting.entity';

import { HarvestGroup } from '../../src/services/harvest-entry/harvest-entry-list-grouped.service';

import { HarvestEntryCutPlateDto } from '../../src/api/dtos/harvest-entry.dto';
import { mockDto } from '../mock/mock.dtos';

import { harvestEntryCutPlateError } from '../../src/api/errors/harverst-entry.errors';

import {
  ErrorResponse,
  ErrorResponseType,
  ListResponseType,
  ObjectResponseType,
} from '../helpers/types/response.types';

import { PlantingType } from '../../src/entities/enums/planting-type.enum';
import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('HarvestEntryListGroupedByPlant', () => {
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
    await testHelper.createHarvestPlateEntry();
    await testHelper.createHarvestCutEntry();
  });

  describe(UseCases.harvestEntry.listGroupedByPlant, () => {
    it(`${UseCases.harvestEntry.listGroupedByPlant} - HDS`, async () => {
      const res = (await Calls.HarvestEntry.listGroupedByPlant(
        app,
        testHelper.getAccessToken,
      )) as ListResponseType<HarvestGroup>;
      ValidationHelper.validateListResponse<HarvestGroup>(res.body);
    });
  });
});
