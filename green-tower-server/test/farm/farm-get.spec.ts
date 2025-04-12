import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { Farm } from '../../src/entities/farm.entity';
import { User } from '../../src/entities/user.entity';

import { mockDto } from '../mock/mock.dtos';

import { getError } from '../../src/api/errors/farm.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import {
  ErrorResponse,
  ErrorResponseType,
  GuardErrorResponseType,
  LoginResponseType,
  ObjectResponseType,
} from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, validateOwnerGuard, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('FarmGet', () => {
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

  describe(UseCases.farm.get, () => {
    it(`${UseCases.farm.get} - HDS`, async () => {
      const res = (await Calls.Farm.get(
        app,
        { id: testHelper.farm.id },
        testHelper.getAccessToken,
      )) as ObjectResponseType<Farm>;

      ValidationHelper.farm.validateFarm(res.body);
    });

    it(`${UseCases.plant.create} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('farm/get/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();

      const res = (await Calls.Farm.get(
        app,
        { id: testHelper.farm.id },
        testHelper.getAccessTokenWithWrongOwner,
      )) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.farm.get} - farm not found`, async () => {
      const expectedError = getError.FarmNotFound();
      const res = (await Calls.Farm.get(
        app,
        { id: crypto.randomUUID() },
        testHelper.getAccessToken,
      )) as ErrorResponseType;

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.farm.get} - forbidden (call by USER)`, async () => {
      const { accessToken } = await testHelper.createUser();
      const res = (await Calls.Farm.get(app, { id: testHelper.farm.id }, accessToken)) as GuardErrorResponseType;
      validateOwnerGuard(res.body);
    });

    it(`${UseCases.farm.get} - forbidden (getting foreign farm)`, async () => {
      const expectedError = getError.Forbidden();
      const email = 'test@test.com';
      await Calls.Auth.signUp(app, { ...mockDto.authRegisterDto, email });
      const newUser = (await testHelper.userRepository.findOne({ where: { email } })) as User;
      await Calls.Auth.confirmEmail(app, { token: newUser.emailConfirmationToken! });
      const newUserLogin = (await Calls.Auth.login(app, {
        email,
        password: mockDto.authRegisterDto.password,
      })) as LoginResponseType;

      const res = (await Calls.Farm.get(
        app,
        { id: testHelper.farm.id },
        newUserLogin.body.accessToken,
      )) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
