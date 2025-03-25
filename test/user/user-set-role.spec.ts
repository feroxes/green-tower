import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { UserRole } from '../../src/entities/user.entity';

import { userSetRoleError } from '../../src/api/errors/user.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponseType, GuardErrorResponseType, UserResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { ErrorResponse, validateError, validateOwnerGuard } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('UserSetRole', () => {
  let app: INestApplication;
  let module: TestingModule;
  let role: UserRole.USER;
  let testHelper: TestHelper;

  beforeAll(async () => {
    const testConfig = await init();
    app = testConfig.app;
    module = testConfig.module;
    role = UserRole.USER;
  });

  afterAll(async () => {
    await closeDatabaseConnection(module);
  });

  beforeEach(async () => {
    await clearDatabase(module);
    testHelper = new TestHelper(app, module);
    await testHelper.init();
  });

  describe(UseCases.user.setRole, () => {
    it(`${UseCases.user.setRole} - HDS`, async () => {
      const { user } = await testHelper.createUser();
      const res = (await Calls.User.setRole(app, testHelper.getAccessToken, { id: user.id, role })) as UserResponseType;

      expect(res.body.role).toBe(role);
    });

    it(`${UseCases.user.setRole} - owner not found (wrong owner id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/setRole/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();
      const { user } = await testHelper.createUser();

      const res = (await Calls.User.setRole(app, testHelper.getAccessTokenWithWrongOwner, {
        id: user.id,
        role,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.setRole} - owner not found (wrong farm id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/setRole/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();
      const { user } = await testHelper.createUser();

      const res = (await Calls.User.setRole(app, testHelper.getAccessTokenWithWrongFarm, {
        id: user.id,
        role,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.setRole} - set role to owner`, async () => {
      const expectedError = userSetRoleError.OwnerCouldNotBeUpdated();
      const res = (await Calls.User.setRole(app, testHelper.getAccessToken, {
        id: testHelper.getOwner.id,
        role,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.setRole} - forbidden (call by ADMIN)`, async () => {
      const { accessToken } = await testHelper.createUser();
      const res = (await Calls.User.setRole(app, accessToken, {
        id: crypto.randomUUID(),
        role,
      })) as GuardErrorResponseType;
      validateOwnerGuard(res.body);
    });

    it(`${UseCases.user.setRole} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/setRole/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();
      const res = (await Calls.User.setRole(app, testHelper.getAccessToken, {
        id: crypto.randomUUID(),
        role,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.setRole} - failed to set user role`, async () => {
      jest.spyOn(testHelper.userRepository, 'save').mockRejectedValue(new Error());
      const expectedError = userSetRoleError.FailedToSetUserRole();
      const { user } = await testHelper.createUser();
      const res = (await Calls.User.setRole(app, testHelper.getAccessToken, {
        id: user.id,
        role,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
