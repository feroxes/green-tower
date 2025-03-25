import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { userDeleteError } from '../../src/api/errors/user.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponseType, GuardErrorResponseType, PlantResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { ErrorResponse, validateError, validateOwnerGuard } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('UserDelete', () => {
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

  describe(UseCases.user.delete, () => {
    it(`${UseCases.user.delete} - HDS`, async () => {
      const { user } = await testHelper.createUser();
      await Calls.User.delete(app, testHelper.getAccessToken, { id: user.id });

      const farm = await testHelper.getFarm();
      expect(farm.users.length).toBe(1);
    });

    it(`${UseCases.user.delete} - HDS (user with plants)`, async () => {
      const { user } = await testHelper.createUser();
      await Calls.User.delete(app, testHelper.getAccessToken, { id: user.id });

      const farm = await testHelper.getFarm();
      expect(farm.users.length).toBe(1);
    });

    it(`${UseCases.user.delete} - owner not found (wrong owner id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/delete/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();
      const { user } = await testHelper.createUser();

      const res = (await Calls.User.delete(app, testHelper.getAccessTokenWithWrongOwner, {
        id: user.id,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.delete} - owner not found (wrong farm id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/delete/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();
      const { user } = await testHelper.createUser();

      const res = (await Calls.User.delete(app, testHelper.getAccessTokenWithWrongFarm, {
        id: user.id,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.delete} - delete owner`, async () => {
      const expectedError = userDeleteError.OwnerCouldNotBeDeleted();
      const res = (await Calls.User.delete(app, testHelper.getAccessToken, {
        id: testHelper.getOwner.id,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.delete} - forbidden (call by ADMIN)`, async () => {
      const { accessToken } = await testHelper.createUser();

      const res = (await Calls.User.delete(app, accessToken, { id: crypto.randomUUID() })) as GuardErrorResponseType;
      validateOwnerGuard(res.body);
    });

    it(`${UseCases.user.delete} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/delete/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();
      const res = (await Calls.User.delete(app, testHelper.getAccessToken, {
        id: crypto.randomUUID(),
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.delete} - failed to delete a user`, async () => {
      jest.spyOn(testHelper.userRepository, 'remove').mockRejectedValue(new Error());
      const expectedError = userDeleteError.FailedToDeleteUser();
      const { user } = await testHelper.createUser();
      const res = (await Calls.User.delete(app, testHelper.getAccessToken, { id: user.id })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
