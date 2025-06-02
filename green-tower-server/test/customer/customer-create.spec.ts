import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Customer } from '../../src/entities/customer.entity';

import { customerCreateError } from '../../src/api/errors/customer.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('CustomerCreate', () => {
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
  });

  describe(UseCases.customer.create, () => {
    it(`${UseCases.customer.create} - HDS`, async () => {
      const res = (await Calls.Customer.create(app, testHelper.getAccessToken)) as ObjectResponseType<Customer>;
      ValidationHelper.customer.validateCustomerCreation(res.body);
    });

    it(`${UseCases.customer.create} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('customer/create/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Customer.create(app, testHelper.getAccessTokenWithWrongOwner)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.customer.create} - failed to create a customer`, async () => {
      const expectedError = customerCreateError.FailedToCreateCustomer();
      jest.spyOn(testHelper.customerRepository, 'save').mockRejectedValue(new Error());
      const res = (await Calls.Customer.create(app, testHelper.getAccessToken)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
