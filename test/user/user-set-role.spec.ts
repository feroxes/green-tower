import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule } from '@nestjs/testing';
import { User, UserRole } from '../../src/entities/user.entity';
import { mockDto } from '../mock/mock.dtos';
import { userSetRoleError } from '../../src/api/errors/user.errors';
import { INestApplication } from '@nestjs/common';
import { ErrorResponse, validateError, validateOwnerGuard } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';
import { Calls } from '../helpers/calls';
import { LoginOrRegistrationResponseType } from '../helpers/types/auth.types';
import { UseCases } from '../helpers/constants';
import { Farm } from '../../src/entities/farm.entity';
import { UserCreateResponseType } from '../helpers/types/user.types';
import { getAccessTokenWithWrongFarm, getAccessTokenWithWrongOwner } from '../helpers/test-helper';

describe('UserSetRole', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let farmRepository: Repository<Farm>;
  let module: TestingModule;
  let accessToken: string;
  let owner: User;
  let role: UserRole.USER;

  beforeAll(async () => {
    const testConfig = await init();
    app = testConfig.app;
    module = testConfig.module;
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    farmRepository = module.get<Repository<Farm>>(getRepositoryToken(Farm));
    role = UserRole.USER;
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

  describe(UseCases.user.setRole, () => {
    it(`${UseCases.user.setRole} - HDS`, async () => {
      let user = (await Calls.User.create(app, accessToken)) as UserCreateResponseType;
      user = await Calls.User.setRole(app, accessToken, { id: user.body.id, role });

      expect(user.body.role).toBe(role);
    });

    it(`${UseCases.user.setRole} - owner not found (wrong owner id)`, async () => {
      const expectedError = userSetRoleError.OwnerNotFound();
      const user = (await Calls.User.create(app, accessToken)) as UserCreateResponseType;
      const farm = await farmRepository.findOne({ where: { id: owner.farm.id }, relations: ['users'] });
      const _accessToken = getAccessTokenWithWrongOwner(module, owner, farm!);

      const res = await Calls.User.setRole(app, _accessToken, { id: user.body.id, role });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.setRole} - owner not found (wrong farm id)`, async () => {
      const expectedError = userSetRoleError.OwnerNotFound();
      const user = (await Calls.User.create(app, accessToken)) as UserCreateResponseType;
      const _accessToken = getAccessTokenWithWrongFarm(module, owner);

      const res = await Calls.User.setRole(app, _accessToken, { id: user.body.id, role });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.setRole} - set role to owner`, async () => {
      const expectedError = userSetRoleError.OwnerCouldNotBeUpdated();
      const res = await Calls.User.setRole(app, accessToken, { id: owner.id, role });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.setRole} - forbidden (call by ADMIN)`, async () => {
      const createUserDto = mockDto.getUserCreateDto(UserRole.USER);
      const { email, password } = createUserDto;

      await Calls.User.create(app, accessToken, createUserDto);
      const userLoginRes = (await Calls.Auth.login(app, { email, password })) as LoginOrRegistrationResponseType;

      const res = await Calls.User.setRole(app, userLoginRes.body.accessToken, { id: crypto.randomUUID(), role });
      validateOwnerGuard(res.body);
    });

    it(`${UseCases.user.setRole} - user not found`, async () => {
      const expectedError = userSetRoleError.UserNotFound();
      const res = await Calls.User.setRole(app, accessToken, { id: crypto.randomUUID(), role });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
