import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../src/entities/farm.entity';
import { User, UserRole } from '../../src/entities/user.entity';

import { mockDto } from '../mock/mock.dtos';

import { UserCheckExistenceComponentError, UserCreateComponentError } from '../../src/api/errors/user-component.errors';

import { LoginOrRegistrationResponseType } from '../helpers/types/auth.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { getAccessTokenWithWrongFarm, getAccessTokenWithWrongOwner } from '../helpers/test-helper';
import { ErrorResponse, validateError, validateOwnerGuard, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('UserCreate', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let farmRepository: Repository<Farm>;
  let module: TestingModule;
  let accessToken: string;
  let owner: User;

  beforeAll(async () => {
    const testConfig = await init();
    app = testConfig.app;
    module = testConfig.module;
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    farmRepository = module.get<Repository<Farm>>(getRepositoryToken(Farm));
  });

  afterAll(async () => {
    await closeDatabaseConnection(module);
  });

  beforeEach(async () => {
    await clearDatabase(module);
    const res = (await Calls.Auth.signUp(app)) as LoginOrRegistrationResponseType;
    owner = (await userRepository.findOne({
      where: { email: mockDto.authRegisterDto.email },
      relations: ['farm'],
    })) as User;
    accessToken = res.body.accessToken;
  });

  describe(UseCases.user.create, () => {
    it(`${UseCases.user.create} - HDS`, async () => {
      const res = await Calls.User.create(app, accessToken);
      ValidationHelper.user.validateUserCreation(res.body);

      const farm = await farmRepository.findOne({ where: { id: owner.farm.id }, relations: ['users'] });
      expect(farm!.users.length).toBe(2);
      expect(farm!.users[1].id).toBe(res.body.id);
    });

    it(`${UseCases.user.create} - user already exists`, async () => {
      const userCreateComponentError = new UserCreateComponentError('user/create/');
      const expectedError = userCreateComponentError.UserAlreadyExists();

      await Calls.User.create(app, accessToken);
      const res = await Calls.User.create(app, accessToken);
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.create} - owner not found (wrong owner id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/create/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();
      const farm = await farmRepository.findOne({ where: { id: owner.farm.id }, relations: ['users'] });
      const _accessToken = getAccessTokenWithWrongOwner(module, owner, farm!);

      const res = await Calls.User.create(app, _accessToken);
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.create} - owner not found (wrong farm id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/create/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();
      const _accessToken = getAccessTokenWithWrongFarm(module, owner);

      const res = await Calls.User.create(app, _accessToken);
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.create} - forbidden (call by USER)`, async () => {
      const createUserDto = mockDto.getUserCreateDto(UserRole.USER);
      const { email, password } = createUserDto;

      await Calls.User.create(app, accessToken, createUserDto);
      const userLoginRes = (await Calls.Auth.login(app, { email, password })) as LoginOrRegistrationResponseType;

      const res = await Calls.User.create(app, userLoginRes.body.accessToken, createUserDto);
      validateOwnerGuard(res.body);
    });

    it(`${UseCases.user.create} - failed to create a user`, async () => {
      jest.spyOn(userRepository, 'save').mockRejectedValue(new Error());
      const userCreateComponentError = new UserCreateComponentError('user/create/');
      const expectedError = userCreateComponentError.FailedToCreateUser();
      const res = await Calls.User.create(app, accessToken);
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
