import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { User, UserRole } from '../../src/entities/user.entity';

import { mockDto } from '../mock/mock.dtos';

import { userUpdateError } from '../../src/api/errors/user.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType, ObjectResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('UserCreate', () => {
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

  describe(UseCases.user.update, () => {
    it(`${UseCases.user.update} - HDS (call by owner)`, async () => {
      const res = (await Calls.User.update(app, testHelper.getAccessToken, {
        id: user.id,
        ...mockDto.userUpdateDto,
      })) as ObjectResponseType<User>;

      ValidationHelper.user.validateUserUpdate(res.body);
    });

    it(`${UseCases.user.update} - HDS (call by himself)`, async () => {
      const res = (await Calls.User.update(app, userAccessToken, {
        id: user.id,
        ...mockDto.userUpdateDto,
      })) as ObjectResponseType<User>;

      ValidationHelper.user.validateUserUpdate(res.body);
    });

    it(`${UseCases.user.update} - executor not found (wrong executor id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/update/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.User.update(app, testHelper.getAccessTokenWithWrongOwner, {
        id: user.id,
        ...mockDto.userUpdateDto,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.update} - owner not found (wrong farm id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/update/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.User.update(app, testHelper.getAccessTokenWithWrongFarm, {
        id: user.id,
        ...mockDto.userUpdateDto,
      })) as ErrorResponseType;

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.update} - forbidden (call by another USER)`, async () => {
      const expectedError = userUpdateError.UserUpdateForbidden();
      const { accessToken } = await testHelper.createUser(UserRole.USER, 'test@example.com');
      const res = (await Calls.User.update(app, accessToken, {
        id: user.id,
        ...mockDto.userUpdateDto,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.update} - failed to update a user`, async () => {
      jest.spyOn(testHelper.userRepository, 'save').mockRejectedValue(new Error());
      const expectedError = userUpdateError.FailedToUpdateUser();
      const res = (await Calls.User.update(app, testHelper.getAccessToken, {
        id: user.id,
        ...mockDto.userUpdateDto,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
