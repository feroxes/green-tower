import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../src/entities/farm.entity';
import { User, UserRole } from '../../src/entities/user.entity';

import { mockDto } from '../mock/mock.dtos';

import { userUpdateError } from '../../src/api/errors/user.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { LoginOrRegistrationResponseType } from '../helpers/types/auth.types';
import { UserCreateResponseType } from '../helpers/types/user.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { getAccessTokenWithWrongFarm, getAccessTokenWithWrongOwner } from '../helpers/test-helper';
import { ErrorResponse, validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('UserCreate', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let farmRepository: Repository<Farm>;
  let module: TestingModule;
  let accessToken: string;
  let executor: User;
  let user: UserCreateResponseType;

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
    executor = (await userRepository.findOne({
      where: { email: mockDto.authRegisterDto.email },
      relations: ['farm'],
    })) as User;
    accessToken = res.body.accessToken;
    user = (await Calls.User.create(app, accessToken)) as UserCreateResponseType;
  });

  describe(UseCases.user.update, () => {
    it(`${UseCases.user.update} - HDS (call by owner)`, async () => {
      const res = await Calls.User.update(app, accessToken, { id: user.body.id, ...mockDto.userUpdateDto });

      ValidationHelper.user.validateUserUpdate(res.body);
    });

    it(`${UseCases.user.update} - HDS (call by himself)`, async () => {
      const userCreateDto = mockDto.getUserCreateDto(UserRole.USER);
      const { email, password } = userCreateDto;
      const userLogin = (await Calls.Auth.login(app, { email, password })) as LoginOrRegistrationResponseType;
      const res = await Calls.User.update(app, userLogin.body.accessToken, {
        id: user.body.id,
        ...mockDto.userUpdateDto,
      });

      ValidationHelper.user.validateUserUpdate(res.body);
    });

    it(`${UseCases.user.update} - executor not found (wrong executor id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/update/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();
      const farm = await farmRepository.findOne({ where: { id: executor.farm.id }, relations: ['users'] });
      const _accessToken = getAccessTokenWithWrongOwner(module, executor, farm!);

      const res = await Calls.User.update(app, _accessToken, { id: user.body.id, ...mockDto.userUpdateDto });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.update} - owner not found (wrong farm id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/update/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();
      const _accessToken = getAccessTokenWithWrongFarm(module, executor);

      const res = await Calls.User.update(app, _accessToken, { id: user.body.id, ...mockDto.userUpdateDto });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.update} - forbidden (call by another USER)`, async () => {
      const expectedError = userUpdateError.UserUpdateForbidden();
      const createUserDto = mockDto.getUserCreateDto(UserRole.USER);
      createUserDto.email = 'test@example.com';
      const { email, password } = createUserDto;

      await Calls.User.create(app, accessToken, createUserDto);
      const userLogin = (await Calls.Auth.login(app, { email, password })) as LoginOrRegistrationResponseType;

      const res = await Calls.User.update(app, userLogin.body.accessToken, {
        id: user.body.id,
        ...mockDto.userUpdateDto,
      });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.update} - failed to update a user`, async () => {
      jest.spyOn(userRepository, 'save').mockRejectedValue(new Error());
      const expectedError = userUpdateError.FailedToUpdateUser();
      const res = await Calls.User.update(app, accessToken, { id: user.body.id, ...mockDto.userUpdateDto });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
