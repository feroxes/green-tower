import { PlantingType } from '@entities/enums/planting-type.enum';
import { ErrorResponse } from '@errors/base.error';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Order } from '@entities/order.entity';

import { mockDto } from '../mock/mock.dtos';
import { OrderCreateDto, OrderListDto } from '@dtos/order.dto';
import { PlantingHarvestDto } from '@dtos/planting.dto';

import { UserCheckExistenceComponentError } from '@errors/user-component.errors';

import { ErrorResponseType, ListResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('OrderList', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let harvestDto: PlantingHarvestDto;
  let orderCreateDto: OrderCreateDto;
  let dto: OrderListDto;
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
    orderCreateDto = {
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
    dto = {
      meta: {
        page: 0,
        size: 10,
      },
    };
  });

  describe(UseCases.order.list, () => {
    it(`${UseCases.order.list} - HDS`, async () => {
      await Calls.Planting.harvest(app, testHelper.getAccessToken, harvestDto);
      await Calls.Order.create(app, testHelper.getAccessToken, orderCreateDto);

      const res = (await Calls.Order.list(app, testHelper.getAccessToken, dto)) as ListResponseType<Order>;
      ValidationHelper.validateListResponse<Order>(res.body);
    });

    it(`${UseCases.order.list} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('order/list/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Order.list(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
