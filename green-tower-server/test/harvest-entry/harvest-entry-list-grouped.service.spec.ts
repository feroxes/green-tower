import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { HarvestGroup } from '../../src/services/harvest-entry/harvest-entry-list-grouped.service';

import { ListResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { ValidationHelper } from '../helpers/validation-helper';
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
