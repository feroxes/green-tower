import { PlantingType } from '@entities/enums/planting-type.enum';
import { ErrorResponse } from '@errors/base.error';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Order } from '@entities/order.entity';

import { HarvestGroup } from '@services/harvest-entry/harvest-entry-list-grouped.service';

import { mockDto } from '../mock/mock.dtos';
import { OrderCreateDto } from '@dtos/order.dto';
import { PlantingHarvestDto } from '@dtos/planting.dto';

import { CustomerComponentError } from '@errors/customer-component.errors';
import { orderCreateError } from '@errors/order.errors';
import { PlantComponentError } from '@errors/plant-component.errors';
import { UserCheckExistenceComponentError } from '@errors/user-component.errors';

import { ErrorResponseType, ListResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('OrderCreate', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let harvestDto: PlantingHarvestDto;
  let dto: OrderCreateDto;
  const subtrahend = 2;

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
    harvestDto = {
      id: testHelper.planting.id,
      type: PlantingType.PLATE,
      harvestGram: 200,
      amountOfPlates: mockDto.plantingCreateDto.amountOfPlates,
    };
    dto = {
      customerId: testHelper.getCustomer.id,
      items: [
        {
          plantId: testHelper.getPlant.id,
          type: PlantingType.PLATE,
          unitPrice: 20,
          amountOfPlates: mockDto.plantingCreateDto.amountOfPlates - subtrahend,
        },
      ],
    };
  });

  describe(UseCases.order.create, () => {
    it(`${UseCases.order.create} - HDS - plate partial`, async () => {
      await Calls.Planting.harvest(app, testHelper.getAccessToken, harvestDto);
      const res = (await Calls.Order.create(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Order>;
      ValidationHelper.order.validateOrderCreation(res.body, dto);

      const harvestGroup = (await Calls.HarvestEntry.listGroupedByPlant(
        app,
        testHelper.getAccessToken,
      )) as ListResponseType<HarvestGroup>;

      const harvestGroupItem = harvestGroup.body.itemList.find((item) => item.plant.id === testHelper.getPlant.id);
      if (harvestGroupItem) {
        expect(harvestGroupItem.plate.totalPlatesLeft).toBe(subtrahend);
      }
    });

    // TODO HDS - plate full, HDS - cut full

    it(`${UseCases.order.create} - HDS - cut partial`, async () => {
      harvestDto.type = PlantingType.CUT;
      delete harvestDto.amountOfPlates;
      await Calls.Planting.harvest(app, testHelper.getAccessToken, harvestDto);

      dto.items[0].type = PlantingType.CUT;
      dto.items[0].amountOfGrams = harvestDto.harvestGram - subtrahend;
      delete dto.items[0].amountOfPlates;
      const res = (await Calls.Order.create(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Order>;

      ValidationHelper.order.validateOrderCreation(res.body, dto);

      const harvestGroup = (await Calls.HarvestEntry.listGroupedByPlant(
        app,
        testHelper.getAccessToken,
      )) as ListResponseType<HarvestGroup>;

      const harvestGroupItem = harvestGroup.body.itemList.find((item) => item.plant.id === testHelper.getPlant.id);
      if (harvestGroupItem) {
        expect(harvestGroupItem.cut.totalGramsLeft).toBe(subtrahend);
      }
    });

    it(`${UseCases.order.create} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('order/create/');

      const res = (await Calls.Order.create(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;

      const expectedError = userCheckExistenceComponentError.UserNotFound();

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.order.create} - customer not found`, async () => {
      dto.customerId = testHelper.getRandomId();

      const customerComponentError = new CustomerComponentError('order/create/');

      const res = (await Calls.Order.create(app, testHelper.getAccessToken, dto)) as ErrorResponseType;

      const expectedError = customerComponentError.CustomerNotFound();
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.order.create} - plant not found`, async () => {
      dto.items[0].plantId = testHelper.getRandomId();

      const plantComponentError = new PlantComponentError('order/create/');

      const res = (await Calls.Order.create(app, testHelper.getAccessToken, dto)) as ErrorResponseType;

      const expectedError = plantComponentError.PlantNotFound();
      if (res.body.params?.e) {
        validateError(res.body.params.e.response, expectedError.getResponse() as ErrorResponse);
      }
    });

    it(`${UseCases.order.create} - NotEnoughStock`, async () => {
      dto.items[0].amountOfPlates = 100;
      await Calls.Planting.harvest(app, testHelper.getAccessToken, harvestDto);
      const expectedError = orderCreateError.NotEnoughStock();
      const res = (await Calls.Order.create(app, testHelper.getAccessToken, dto)) as ErrorResponseType;

      if (res.body.params?.e) {
        validateError(res.body.params.e.response, expectedError.getResponse() as ErrorResponse);
      }
    });
  });
});
