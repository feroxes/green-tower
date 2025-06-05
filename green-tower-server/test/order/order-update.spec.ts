import { PlantingType } from '@entities/enums/planting-type.enum';
import { ErrorResponse } from '@errors/base.error';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Order } from '@entities/order.entity';

import { HarvestEntryComponent } from '@components/harvest-entry.component';

import { mockDto } from '../mock/mock.dtos';
import { OrderUpdateDto } from '@dtos/order.dto';

import { orderUpdateError } from '@errors/order.errors';
import { OrderComponentError } from '@errors/order-component.errors';
import { UserCheckExistenceComponentError } from '@errors/user-component.errors';

import { ErrorResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('OrderUpdate', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let order: ObjectResponseType<Order>;
  let harvestEntryComponent: HarvestEntryComponent;
  let dto: OrderUpdateDto;
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
    jest.restoreAllMocks();
    testHelper = new TestHelper(app, module);
    await testHelper.init();
    harvestEntryComponent = module.get(HarvestEntryComponent);
    await Calls.Planting.harvest(app, testHelper.getAccessToken, {
      id: testHelper.planting.id,
      type: PlantingType.PLATE,
      harvestGram: 200,
      amountOfPlates: mockDto.plantingCreateDto.amountOfPlates - subtrahend,
    });
    await Calls.Planting.harvest(app, testHelper.getAccessToken, {
      id: testHelper.planting.id,
      type: PlantingType.CUT,
      harvestGram: 200,
      amountOfPlates: subtrahend,
    });
    const orderCreateDto = {
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
    order = (await Calls.Order.create(app, testHelper.getAccessToken, orderCreateDto)) as ObjectResponseType<Order>;
    dto = { id: order.body.id, ...orderCreateDto };
  });

  describe(UseCases.order.update, () => {
    it(`${UseCases.order.update} - HDS`, async () => {
      const res = (await Calls.Order.update(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Order>;
      ValidationHelper.order.validateOrderUpdate(res.body, dto);
    });

    it(`${UseCases.order.update} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('order/update/');

      const res = (await Calls.Order.update(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;

      const expectedError = userCheckExistenceComponentError.UserNotFound();

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.order.update} - order not found`, async () => {
      const orderComponentError = new OrderComponentError('order/update/');

      const res = (await Calls.Order.update(app, testHelper.getAccessToken, {
        ...dto,
        id: testHelper.getRandomId(),
      })) as ErrorResponseType;

      const expectedError = orderComponentError.OrderNotFound();
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.order.update} - failed to rollback Harvest Entry`, async () => {
      const expectedError = orderUpdateError.FailedToRollbackHarvestEntry();
      jest.spyOn(harvestEntryComponent, 'rollbackHarvestEntry').mockImplementation(() => {
        throw new Error();
      });
      const res = (await Calls.Order.update(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.order.update} - failed to allocate Harvest Entry`, async () => {
      const expectedError = orderUpdateError.FailedToAllocateHarvestEntry();

      jest.spyOn(harvestEntryComponent, 'allocateHarvestEntry').mockImplementation(() => {
        throw new Error();
      });
      const res = (await Calls.Order.update(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.order.update} - plant not found`, async () => {
      const expectedError = orderUpdateError.PlantNotFound();
      dto.items[0].plantId = testHelper.getRandomId();
      const res = (await Calls.Order.update(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.order.update} - not enough stock`, async () => {
      const expectedError = orderUpdateError.NotEnoughStock();
      dto.items[0].amountOfPlates = 100;
      const res = (await Calls.Order.update(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
