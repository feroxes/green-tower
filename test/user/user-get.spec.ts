import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { User } from '../../src/entities/user.entity';

import { userGetError } from '../../src/api/errors/user.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('UserGet', () => {
  let app: INestApplication;
  let module: TestingModule;
  let user: User;
  let userAccessToken: string;
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
    const res = await testHelper.createUser();
    user = res.user;
    userAccessToken = res.accessToken;
  });

  describe(UseCases.user.get, () => {
    it(`${UseCases.user.get} - HDS (get owner himself)`, async () => {
      const res = (await Calls.User.get(app, testHelper.getAccessToken)) as ObjectResponseType<User>;

      ValidationHelper.user.validateUserGet(res.body);
    });

    it(`${UseCases.user.get} - HDS (call by owner - getting user)`, async () => {
      const res = (await Calls.User.get(app, testHelper.getAccessToken, {
        id: user.id,
      })) as ObjectResponseType<User>;

      ValidationHelper.user.validateUserGet(res.body);
    });

    it(`${UseCases.user.get} - HDS (call by user - getting himself)`, async () => {
      const res = (await Calls.User.get(app, userAccessToken)) as ObjectResponseType<User>;

      ValidationHelper.user.validateUserGet(res.body);
    });

    it(`${UseCases.user.get} - executor does not exist`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/get/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.User.get(app, testHelper.getAccessTokenWithWrongOwner)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.get} - user get forbidden`, async () => {
      const expectedError = userGetError.UserGetForbidden();
      const res = (await Calls.User.get(app, userAccessToken, {
        id: testHelper.getOwner.id,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.get} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/get/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.User.get(app, testHelper.getAccessToken, {
        id: crypto.randomUUID(),
      })) as ErrorResponseType;

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
