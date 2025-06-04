import { PlantingType } from '@entities/enums/planting-type.enum';
import { ErrorResponse } from '@errors/base.error';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { HarvestEntryState } from '@entities/harvest-entry.entity';
import { Order } from '@entities/order.entity';

import { HarvestGroup } from '@services/harvest-entry/harvest-entry-list-grouped.service';

import { mockDto } from '../mock/mock.dtos';
import { OrderDeleteDto } from '@dtos/order.dto';

import { OrderComponentError } from '@errors/order-component.errors';
import { UserCheckExistenceComponentError } from '@errors/user-component.errors';

import { ErrorResponseType, ListResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('OrderDelete', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let order: ObjectResponseType<Order>;
  let dto: OrderDeleteDto;
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
    await Calls.Planting.harvest(app, testHelper.getAccessToken, {
      id: testHelper.planting.id,
      type: PlantingType.PLATE,
      harvestGram: 200,
      amountOfPlates: mockDto.plantingCreateDto.amountOfPlates,
    });
    order = (await Calls.Order.create(app, testHelper.getAccessToken, {
      customerId: testHelper.getCustomer.id,
      items: [
        {
          plantId: testHelper.getPlant.id,
          type: PlantingType.PLATE,
          unitPrice: 20,
          amountOfPlates: mockDto.plantingCreateDto.amountOfPlates - subtrahend,
        },
      ],
    })) as ObjectResponseType<Order>;
    dto = { id: order.body.id };
  });

  describe(UseCases.order.delete, () => {
    it(`${UseCases.order.delete} - HDS`, async () => {
      const res = (await Calls.Order.delete(app, testHelper.getAccessToken, dto)) as Response;
      const orderItemHarvestEntry = await testHelper.orderItemHarvestEntryRepository.find({
        where: { orderItem: { id: order.body.items[0].id } },
      });
      const harvestEntryList = (await Calls.HarvestEntry.listGroupedByPlant(
        app,
        testHelper.getAccessToken,
      )) as ListResponseType<HarvestGroup>;

      ValidationHelper.validateSuccessResponse(res);
      expect(orderItemHarvestEntry.length).toBe(0);
      expect(harvestEntryList.body.itemList[0].plate.totalPlatesLeft).toBe(mockDto.plantingCreateDto.amountOfPlates);
      expect(harvestEntryList.body.itemList[0].plate.entries[0].state).toBe(HarvestEntryState.READY);
    });

    it(`${UseCases.order.delete} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('order/delete/');

      const res = (await Calls.Order.delete(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;

      const expectedError = userCheckExistenceComponentError.UserNotFound();

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.order.delete} - order not found`, async () => {
      const orderComponentError = new OrderComponentError('order/delete/');

      const res = (await Calls.Order.delete(app, testHelper.getAccessToken, {
        id: testHelper.getRandomId(),
      })) as ErrorResponseType;

      const expectedError = orderComponentError.OrderNotFound();
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
