import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Planting, PlantingState } from '../../src/entities/planting.entity';

import { PlantingSetStateDto } from '../../src/api/dtos/planting.dto';

import { plantingSetStateError } from '../../src/api/errors/planting.errors';
import { PlantingComponentError } from '../../src/api/errors/planting-component.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('PlantingSetState', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: PlantingSetStateDto;

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
      state: PlantingState.READY,
    };
  });

  describe(UseCases.planting.setState, () => {
    it(`${UseCases.planting.setState} - HDS`, async () => {
      const res = (await Calls.Planting.setState(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Planting>;
      ValidationHelper.planting.validatePlantingState(res.body, dto.state);
    });

    it(`${UseCases.planting.setState} - HDS - harvested`, async () => {
      const state = PlantingState.HARVESTED;
      const res = (await Calls.Planting.setState(app, testHelper.getAccessToken, {
        ...dto,
        state,
      })) as ObjectResponseType<Planting>;
      ValidationHelper.planting.validatePlantingState(res.body, state);
    });

    it(`${UseCases.planting.setState} - HDS - dead`, async () => {
      const state = PlantingState.DEAD;
      const res = (await Calls.Planting.setState(app, testHelper.getAccessToken, {
        ...dto,
        state,
      })) as ObjectResponseType<Planting>;
      ValidationHelper.planting.validatePlantingState(res.body, state);
    });

    it(`${UseCases.planting.setState} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('planting/setState/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Planting.setState(
        app,
        testHelper.getAccessTokenWithWrongOwner,
        dto,
      )) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.setState} - planting not found`, async () => {
      const plantingComponentError = new PlantingComponentError('planting/setState/');
      const expectedError = plantingComponentError.PlantingNotFound();

      const res = (await Calls.Planting.setState(app, testHelper.getAccessToken, {
        ...dto,
        id: testHelper.getRandomId(),
      })) as ErrorResponseType;

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.setState} - planting is in final state`, async () => {
      const finalStatePlanting = { ...testHelper.getPlanting, state: PlantingState.HARVESTED };
      await testHelper.plantingRepository.save(finalStatePlanting);

      const res = (await Calls.Planting.setState(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      const expectedError = plantingSetStateError.PlantingIsInFinalState({ state: PlantingState.HARVESTED });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.setState} - cannot set growing state after harvest time`, async () => {
      const readyPlanting = { ...testHelper.planting, state: PlantingState.READY };
      const expectedHarvestTs = new Date();
      expectedHarvestTs.setHours(expectedHarvestTs.getHours() - 1);

      await testHelper.plantingRepository.save({ ...readyPlanting, expectedHarvestTs });

      const res = (await Calls.Planting.setState(app, testHelper.getAccessToken, {
        ...dto,
        state: PlantingState.GROWING,
      })) as ErrorResponseType;
      const expectedError = plantingSetStateError.CannotSetGrowingState();
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.planting.setState} - failed to set planting state`, async () => {
      const expectedError = plantingSetStateError.FailedToSetPlantingState();
      jest.spyOn(testHelper.plantingRepository, 'save').mockRejectedValue(new Error());
      const res = (await Calls.Planting.setState(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
