import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';

import { User } from '../../src/entities/user.entity';

import { mockDto } from '../mock/mock.dtos';

import { confirmEmailError } from '../../src/api/errors/auth.errors';

import { ErrorResponse, ErrorResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('AuthConfirmEmail', () => {
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

  describe(UseCases.auth.confirmEmail, () => {
    it(`${UseCases.auth.confirmEmail} - HDS`, async () => {
      const user = (await userRepository.findOne({ where: { email: mockDto.authRegisterDto.email } })) as User;
      const res = (await Calls.Auth.confirmEmail(app, { token: user.emailConfirmationToken! })) as Response;
      ValidationHelper.validateSuccessResponse(res);
    });

    it(`${UseCases.auth.confirmEmail} - invalid confirmation token`, async () => {
      const expectedError = confirmEmailError.InvalidConfirmationToken();
      const res = (await Calls.Auth.confirmEmail(app, {
        token: crypto.randomBytes(32).toString('hex'),
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.auth.confirmEmail} - confirmation token expired`, async () => {
      const expectedError = confirmEmailError.ConfirmationTokenExpired();
      const user = (await userRepository.findOne({ where: { email: mockDto.authRegisterDto.email } })) as User;
      const wrongDate = new Date();
      wrongDate.setFullYear(wrongDate.getFullYear() - 1);
      user.emailConfirmationExpires = wrongDate;
      await userRepository.save(user);

      const res = (await Calls.Auth.confirmEmail(app, {
        token: user.emailConfirmationToken!,
      })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.auth.confirmEmail} - failed to update a user`, async () => {
      jest.spyOn(userRepository, 'save').mockRejectedValue(new Error());
      const expectedError = confirmEmailError.FailedToUpdateUser();
      const user = (await userRepository.findOne({ where: { email: mockDto.authRegisterDto.email } })) as User;
      const res = (await Calls.Auth.confirmEmail(app, { token: user.emailConfirmationToken! })) as ErrorResponseType;
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
