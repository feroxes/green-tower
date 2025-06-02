import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Customer } from '../../src/entities/customer.entity';

import { CustomerListDto } from '../../src/api/dtos/customer.dto';

import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType, ListResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('CustomerList', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: CustomerListDto;

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
      meta: {
        page: 0,
        size: 10,
      },
    };
  });

  describe(UseCases.customer.list, () => {
    it(`${UseCases.customer.list} - HDS`, async () => {
      const res = (await Calls.Customer.list(app, testHelper.getAccessToken, dto)) as ListResponseType<Customer>;
      ValidationHelper.validateListResponse<Customer>(res.body);
    });

    it(`${UseCases.customer.list} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('customer/list/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Customer.list(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
