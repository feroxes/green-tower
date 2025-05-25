import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { PlantingState } from '../../../src/entities/planting.entity';

import { PlantingAutoSetStateService } from '../../../src/services/planting/planting-auto-set-state.service';

import { TestHelper } from '../../helpers/test-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../../test.config';

describe('PlantingAutoSetState', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let service: PlantingAutoSetStateService;

  beforeAll(async () => {
    const testConfig = await init();
    app = testConfig.app;
    module = testConfig.module;
    service = module.get<PlantingAutoSetStateService>(PlantingAutoSetStateService);
  });

  afterAll(async () => {
    await closeDatabaseConnection(module);
  });

  beforeEach(async () => {
    await clearDatabase(module);
    testHelper = new TestHelper(app, module);
    await testHelper.init();
  });

  describe('handlePlantingsReadyTransition', () => {
    it(`handlePlantingsReadyTransition- HDS`, async () => {
      const expectedHarvestTs = new Date();
      expectedHarvestTs.setHours(expectedHarvestTs.getHours() + 1);
      const nonGrowingPlanting = { ...testHelper.getPlanting, expectedHarvestTs };
      await testHelper.plantingRepository.save(nonGrowingPlanting);

      await service.handlePlantingsReadyTransition();

      const planting = await testHelper.loadPlanting();

      expect(planting.state).toBe(PlantingState.READY);
    });
  });
});
