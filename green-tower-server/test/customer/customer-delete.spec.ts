import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { UserRole } from '../../src/entities/user.entity';

import { CustomerDeleteDto } from '../../src/api/dtos/customer.dto';

import { customerDeleteError } from '../../src/api/errors/customer.errors';
import { CustomerComponentError } from '../../src/api/errors/customer-component.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType, GuardErrorResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, validateOwnerGuard, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('CustomerDelete', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: CustomerDeleteDto;

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
    dto = { id: testHelper.getCustomer.id };
  });

  describe(UseCases.customer.delete, () => {
    it(`${UseCases.customer.delete} - HDS`, async () => {
      const res = (await Calls.Customer.delete(app, testHelper.getAccessToken, dto)) as Response;
      ValidationHelper.validateSuccessResponse(res);
    });

    it(`${UseCases.customer.delete} - call under USER`, async () => {
      const { accessToken } = await testHelper.createUser(UserRole.USER);
      const res = (await Calls.Customer.delete(app, accessToken, dto)) as GuardErrorResponseType;
      validateOwnerGuard(res.body);
    });

    it(`${UseCases.customer.delete} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('customer/delete/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Customer.delete(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.customer.delete} - customer not found`, async () => {
      const customerComponentError = new CustomerComponentError('customer/delete/');
      const expectedError = customerComponentError.CustomerNotFound();

      dto.id = testHelper.getRandomId();
      const res = (await Calls.Customer.delete(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.customer.delete} - failed to delete a customer`, async () => {
      const expectedError = customerDeleteError.FailedToDeleteCustomer();
      jest.spyOn(testHelper.customerRepository, 'remove').mockRejectedValue(new Error());
      const res = (await Calls.Customer.delete(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
