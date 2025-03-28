import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../src/entities/user.entity';

import { mockDto } from '../mock/mock.dtos';

import { loginError } from '../../src/api/errors/auth.errors';

import { ErrorResponseType, LoginResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { ErrorResponse, validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('AuthLogin', () => {
  let app: INestApplication;
  let module: TestingModule;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const testConfig = await init();
    app = testConfig.app;
    module = testConfig.module;
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
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
      const user = await userRepository.findOne({ where: { email: mockDto.authRegisterDto.email } });
      await Calls.Auth.confirmEmail(app, { token: user!.emailConfirmationToken! });
      const res = (await Calls.Auth.login(app)) as LoginResponseType;
      ValidationHelper.auth.validateDto(res.body);
    });

    it(`${UseCases.auth.login} - wrong email`, async () => {
      const expectedError = loginError.InvalidCredentials();
      const res = (await Calls.Auth.login(app, {
        ...mockDto.authLoginDto,
        email: 'wrongEmail@gmail.com',
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.auth.login} - wrong password`, async () => {
      const expectedError = loginError.InvalidCredentials();
      const user = await userRepository.findOne({ where: { email: mockDto.authRegisterDto.email } });
      await Calls.Auth.confirmEmail(app, { token: user!.emailConfirmationToken! });
      const res = (await Calls.Auth.login(app, {
        ...mockDto.authLoginDto,
        password: 'wrongPassword',
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.auth.login} - email not confirmed`, async () => {
      const expectedError = loginError.EmailNotConfirmed();
      const res = (await Calls.Auth.login(app)) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
