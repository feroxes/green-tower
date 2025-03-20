import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { mockDto } from '../mock/mock.dtos';
import { loginError } from '../../src/api/errors/auth.errors';
import { ValidationHelper, validateError, ErrorResponse } from '../helpers/validation-helper';
import { init, clearDatabase, closeDatabaseConnection } from '../test.config';
import { UseCases } from '../helpers/constants';
import { Calls } from '../helpers/calls';

describe('AuthLogin', () => {
  let app: INestApplication;
  let module: TestingModule;

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
    await Calls.Auth.signUp(app);
  });

  describe(UseCases.auth.login, () => {
    it(`${UseCases.auth.login} - HDS`, async () => {
      const res = await Calls.Auth.login(app);
      ValidationHelper.auth.validateDto(res.body);
    });

    it(`${UseCases.auth.login} - wrong email`, async () => {
      const expectedError = loginError.InvalidCredentials();
      const res = await Calls.Auth.login(app, { ...mockDto.authLoginDto, email: 'wrongEmail@gmail.com' });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.auth.login} - wrong password`, async () => {
      const expectedError = loginError.InvalidCredentials();
      const res = await Calls.Auth.login(app, { ...mockDto.authLoginDto, password: 'wrongPassword' });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
