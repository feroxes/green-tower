import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../src/entities/farm.entity';
import { User, UserRole } from '../../src/entities/user.entity';

import { mockDto } from '../mock/mock.dtos';

import { getError } from '../../src/api/errors/farm.errors';

import { LoginOrRegistrationResponseType } from '../helpers/types/auth.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { ErrorResponse, validateError, validateOwnerGuard, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('FarmGet', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let module: TestingModule;
  let accessToken: string;
  let user: User;

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
    const res = (await Calls.Auth.signUp(app)) as LoginOrRegistrationResponseType;
    accessToken = res.body.accessToken;
    user = (await userRepository.findOne({
      where: { email: mockDto.authRegisterDto.email },
      relations: ['farm'],
    })) as User;
  });

  describe(UseCases.farm.get, () => {
    it(`${UseCases.farm.get} - HDS`, async () => {
      const res = await Calls.Farm.get(app, { id: user.farm.id }, accessToken);
      ValidationHelper.farm.validateFarm(res.body as Farm);
    });

    it(`${UseCases.farm.get} - farm not found`, async () => {
      const expectedError = getError.FarmNotFound();
      const res = await Calls.Farm.get(app, { id: crypto.randomUUID() }, accessToken);
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.farm.get} - forbidden (call by USER)`, async () => {
      const userCreateDto = mockDto.getUserCreateDto(UserRole.USER);
      const { email, password } = userCreateDto;

      await Calls.User.create(app, accessToken, userCreateDto);

      const userLogin = (await Calls.Auth.login(app, { email, password })) as LoginOrRegistrationResponseType;
      const res = await Calls.Farm.get(app, { id: user.farm.id }, userLogin.body.accessToken);
      validateOwnerGuard(res.body);
    });

    it(`${UseCases.farm.get} - forbidden (getting foreign farm)`, async () => {
      const expectedError = getError.Forbidden();
      const email = 'test@test.com';
      const newUserRegistration = (await Calls.Auth.signUp(app, {
        ...mockDto.authRegisterDto,
        email,
      })) as LoginOrRegistrationResponseType;

      const res = await Calls.Farm.get(app, { id: user.farm.id }, newUserRegistration.body.accessToken);
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
