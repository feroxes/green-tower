import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../src/entities/farm.entity';
import { User, UserRole } from '../../src/entities/user.entity';

import { mockDto } from '../mock/mock.dtos';

import { userDeleteError } from '../../src/api/errors/user.errors';
import { UserCheckExistenceComponentError } from '../../src/api/errors/user-component.errors';

import { LoginOrRegistrationResponseType } from '../helpers/types/auth.types';
import { UserCreateResponseType } from '../helpers/types/user.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { getAccessTokenWithWrongFarm, getAccessTokenWithWrongOwner } from '../helpers/test-helper';
import { ErrorResponse, validateError, validateOwnerGuard } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('UserDelete', () => {
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

  describe(UseCases.user.delete, () => {
    it(`${UseCases.user.delete} - HDS`, async () => {
      const user = (await Calls.User.create(app, accessToken)) as UserCreateResponseType;
      await Calls.User.delete(app, accessToken, { id: user.body.id });

      const farm = await farmRepository.findOne({ where: { id: owner.farm.id }, relations: ['users'] });
      expect(farm!.users.length).toBe(1);
    });

    it(`${UseCases.user.delete} - owner not found (wrong owner id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/delete/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();
      const user = (await Calls.User.create(app, accessToken)) as UserCreateResponseType;
      const farm = await farmRepository.findOne({ where: { id: owner.farm.id }, relations: ['users'] });
      const _accessToken = getAccessTokenWithWrongOwner(module, owner, farm!);

      const res = await Calls.User.delete(app, _accessToken, { id: user.body.id });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.delete} - owner not found (wrong farm id)`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/delete/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();
      const user = (await Calls.User.create(app, accessToken)) as UserCreateResponseType;
      const _accessToken = getAccessTokenWithWrongFarm(module, owner);

      const res = await Calls.User.delete(app, _accessToken, { id: user.body.id });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.delete} - delete owner`, async () => {
      const expectedError = userDeleteError.OwnerCouldNotBeDeleted();
      const res = await Calls.User.delete(app, accessToken, { id: owner.id });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.delete} - forbidden (call by ADMIN)`, async () => {
      const createUserDto = mockDto.getUserCreateDto(UserRole.USER);
      const { email, password } = createUserDto;

      await Calls.User.create(app, accessToken, createUserDto);
      const userLoginRes = (await Calls.Auth.login(app, { email, password })) as LoginOrRegistrationResponseType;

      const res = await Calls.User.delete(app, userLoginRes.body.accessToken, { id: crypto.randomUUID() });
      validateOwnerGuard(res.body);
    });

    it(`${UseCases.user.delete} - user not found`, async () => {
      const userCheckExistenceComponentError = new UserCheckExistenceComponentError('user/delete/');
      const expectedError = userCheckExistenceComponentError.UserNotFound();
      const res = await Calls.User.delete(app, accessToken, { id: crypto.randomUUID() });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.delete} - failed to delete a user`, async () => {
      jest.spyOn(userRepository, 'remove').mockRejectedValue(new Error());
      const expectedError = userDeleteError.FailedToDeleteUser();
      const user = (await Calls.User.create(app, accessToken)) as UserCreateResponseType;
      const res = await Calls.User.delete(app, accessToken, { id: user.body.id });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
