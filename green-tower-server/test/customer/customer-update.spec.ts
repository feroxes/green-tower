import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Customer } from '../../src/entities/customer.entity';

import { CustomerUpdateDto } from '../../src/api/dtos/customer.dto';
import { mockDto } from '../mock/mock.dtos';

import { customerUpdateError } from '../../src/api/errors/customer.errors';
import { CustomerComponentError } from '../../src/api/errors/customer-component.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('CustomerUpdate', () => {
  let app: INestApplication;
  let module: TestingModule;
  let testHelper: TestHelper;
  let dto: CustomerUpdateDto;

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
      ...mockDto.customerCreateDto,
      id: testHelper.getCustomer.id,
    };
  });

  describe(UseCases.customer.update, () => {
    it(`${UseCases.customer.update} - HDS`, async () => {
      const res = (await Calls.Customer.update(app, testHelper.getAccessToken, dto)) as ObjectResponseType<Customer>;
      ValidationHelper.customer.validateCustomerUpdate(res.body, dto);
    });

    it(`${UseCases.customer.update} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('customer/update/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Customer.update(app, testHelper.getAccessTokenWithWrongOwner, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.customer.update} - customer not found`, async () => {
      const customerComponentError = new CustomerComponentError('customer/update/');
      const expectedError = customerComponentError.CustomerNotFound();

      dto.id = testHelper.getRandomId();
      const res = (await Calls.Customer.update(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.customer.update} - failed to update a customer`, async () => {
      const expectedError = customerUpdateError.FailedToUpdateCustomer();
      jest.spyOn(testHelper.customerRepository, 'save').mockRejectedValue(new Error());
      const res = (await Calls.Customer.update(app, testHelper.getAccessToken, dto)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
