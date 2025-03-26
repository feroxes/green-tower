import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';

import { User } from '../../src/entities/user.entity';

import { mockDto } from '../mock/mock.dtos';

import { resendConfirmationEmailError } from '../../src/api/errors/auth.errors';

import { ErrorResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { ErrorResponse, validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('AuthResendConfirmationEmail', () => {
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

  describe(UseCases.auth.resendConfirmationEmail, () => {
    it(`${UseCases.auth.resendConfirmationEmail} - HDS`, async () => {
      const res = (await Calls.Auth.resendConfirmationEmail(app, { email: mockDto.authRegisterDto.email })) as Response;
      ValidationHelper.validateSuccessRequest(res);
    });

    it(`${UseCases.auth.resendConfirmationEmail} - user does not exist`, async () => {
      const expectedError = resendConfirmationEmailError.UserDoesNotExist();
      const res = (await Calls.Auth.resendConfirmationEmail(app, {
        email: 'test@example.com',
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.auth.resendConfirmationEmail} - confirmation token expired`, async () => {
      const expectedError = resendConfirmationEmailError.EmailAlreadyConfirmed();
      const user = (await userRepository.findOne({ where: { email: mockDto.authRegisterDto.email } })) as User;
      await Calls.Auth.confirmEmail(app, { token: user.emailConfirmationToken! });
      const res = (await Calls.Auth.resendConfirmationEmail(app, {
        email: mockDto.authRegisterDto.email,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.auth.resendConfirmationEmail} - failed to update a user`, async () => {
      jest.spyOn(userRepository, 'save').mockRejectedValue(new Error());
      const expectedError = resendConfirmationEmailError.FailedToUpdateUser();
      const res = (await Calls.Auth.resendConfirmationEmail(app, {
        email: mockDto.authRegisterDto.email,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
