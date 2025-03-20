import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';
import { ValidationHelper, validateError, ErrorResponse } from '../helpers/validation-helper';
import { LoginOrRegistrationResponseBodyType } from '../helpers/types/auth.types';
import { User } from '../../src/entities/user.entity';
import { Farm } from '../../src/entities/farm.entity';
import { mockDto } from '../mock/mock.dtos';
import { UseCases } from '../helpers/constants';
import { registerError } from '../../src/api/errors/auth.errors';
import { Calls } from '../helpers/calls';

describe('AuthSignup', () => {
  let app: INestApplication;
  let module: TestingModule;
  let farmRepository: Repository<Farm>;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const testConfig = await init();
    app = testConfig.app;
    module = testConfig.module;
    farmRepository = module.get<Repository<Farm>>(getRepositoryToken(Farm));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    await closeDatabaseConnection(module);
  });

  beforeEach(async () => {
    await clearDatabase(module);
  });

  describe(UseCases.auth.signUp, () => {
    it(`${UseCases.auth.signUp} - HDS`, async () => {
      const response = await Calls.Auth.signUp(app);
      const user = await userRepository.findOne({
        where: { email: mockDto.authRegisterDto.email },
        relations: ['farm'],
      });

      const farm = await farmRepository.findOne({
        where: { name: mockDto.authRegisterDto.farmName },
      });

      ValidationHelper.auth.validateDto(response.body as LoginOrRegistrationResponseBodyType);
      ValidationHelper.farm.validateFarm(farm as Farm);
      ValidationHelper.user.validateUserRegistration(user as User, farm as Farm);
    });

    it(`${UseCases.auth.signUp} - user already exists error`, async () => {
      const expectedError = registerError.UserAlreadyExists();
      await Calls.Auth.signUp(app);
      const res = await Calls.Auth.signUp(app);
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
