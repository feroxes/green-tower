import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { mockDto } from '../mock/mock.dtos';

import { registerError } from '../../src/api/errors/auth.errors';
import { UserCreateComponentError } from '../../src/api/errors/user-component.errors';

import { ErrorResponse, ErrorResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('AuthSignup', () => {
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

  describe(UseCases.auth.signUp, () => {
    it(`${UseCases.auth.signUp} - HDS`, async () => {
      const user = await testHelper.loadUser();
      const farm = await testHelper.loadFarm();
      ValidationHelper.farm.validateFarm(farm);
      ValidationHelper.user.validateUserRegistration(user, farm);
    });

    it(`${UseCases.auth.signUp} - user already exists error`, async () => {
      const userCheckExistenceComponentError = new UserCreateComponentError('auth/register/');
      const expectedError = userCheckExistenceComponentError.UserAlreadyExists();
      const res = (await Calls.Auth.signUp(app)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.auth.signUp} - failed to create farm`, async () => {
      jest.spyOn(testHelper.farmRepository, 'save').mockRejectedValue(new Error());
      const expectedError = registerError.FailedToCreateFarm();
      const email = 'test@test.com';
      const registerDto = { ...mockDto.authRegisterDto, email };
      const res = (await Calls.Auth.signUp(app, registerDto)) as ErrorResponseType;

      validateError(res.body, expectedError.getResponse() as ErrorResponse);

      const user = await testHelper.userRepository.findOne({
        where: { email },
        relations: ['farm'],
      });
      expect(user).toBe(null);
    });

    // `${UseCases.auth.signUp} - failed to update user - could not be reproduced`
  });
});
