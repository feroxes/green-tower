import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { User } from '../../src/entities/user.entity';

import { UserCheckExistenceComponentError, UserCreateComponentError } from '../../src/api/errors/user-component.errors';

import {
  ErrorResponse,
  ErrorResponseType,
  GuardErrorResponseType,
  ObjectResponseType,
} from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, validateOwnerGuard, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('UserCreate', () => {
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

  describe(UseCases.user.create, () => {
    it(`${UseCases.user.create} - HDS`, async () => {
      const res = (await Calls.User.create(app, testHelper.getAccessToken)) as ObjectResponseType<User>;
      const farm = await testHelper.getFarm();

      ValidationHelper.user.validateUserCreation(res.body);

      expect(farm.users.length).toBe(2);
      expect(farm.users[1].id).toBe(res.body.id);
    });

    it(`${UseCases.user.create} - user already exists`, async () => {
      const userCreateComponentError = new UserCreateComponentError('user/create/');
      const expectedError = userCreateComponentError.UserAlreadyExists();

      await Calls.User.create(app, testHelper.getAccessToken);
      const res = (await Calls.User.create(app, testHelper.getAccessToken)) as ErrorResponseType;

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.create} - owner not found (wrong owner id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/create/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.User.create(app, testHelper.getAccessTokenWithWrongOwner)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.create} - owner not found (wrong farm id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/create/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.User.create(app, testHelper.getAccessTokenWithWrongFarm)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.create} - forbidden (call by USER)`, async () => {
      const { accessToken, createUserDto } = await testHelper.createUser();
      const res = (await Calls.User.create(app, accessToken, createUserDto)) as GuardErrorResponseType;
      validateOwnerGuard(res.body);
    });

    it(`${UseCases.user.create} - failed to create a user`, async () => {
      jest.spyOn(testHelper.userRepository, 'save').mockRejectedValue(new Error());
      const userCreateComponentError = new UserCreateComponentError('user/create/');
      const expectedError = userCreateComponentError.FailedToCreateUser();
      const res = (await Calls.User.create(app, testHelper.getAccessToken)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
