import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule } from '@nestjs/testing';
import { User, UserRole } from '../../src/entities/user.entity';
import { mockDto } from '../mock/mock.dtos';
import { userDeleteError } from '../../src/api/errors/user.errors';
import { INestApplication } from '@nestjs/common';
import { ErrorResponse, validateError } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';
import { Calls } from '../helpers/calls';
import { LoginOrRegistrationResponseType } from '../helpers/types/auth.types';
import { UseCases } from '../helpers/constants';
import { Farm } from '../../src/entities/farm.entity';
import { UserCreateResponseType } from '../helpers/types/user.types';

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
      const expectedError = userDeleteError.OwnerNotFound();
      const user = (await Calls.User.create(app, accessToken)) as UserCreateResponseType;
      const farm = await farmRepository.findOne({ where: { id: owner.farm.id }, relations: ['users'] });
      const payload = {
        sub: crypto.randomUUID(),
        email: owner.email,
        role: UserRole.OWNER,
        farmId: farm!.id,
      };
      const configService = module.get(ConfigService);
      const secret: string = configService.get('JWT_SECRET')!;
      const jwtService = new JwtService({
        secret,
        signOptions: { expiresIn: '60s' },
      });
      const _accessToken = jwtService.sign(payload);
      const res = await Calls.User.delete(app, _accessToken, { id: user.body.id });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.delete} - owner not found (wrong farm id)`, async () => {
      const expectedError = userDeleteError.OwnerNotFound();
      const user = (await Calls.User.create(app, accessToken)) as UserCreateResponseType;
      const payload = {
        sub: owner.id,
        email: owner.email,
        role: UserRole.OWNER,
        farmId: crypto.randomUUID(),
      };
      const configService = module.get(ConfigService);
      const secret: string = configService.get('JWT_SECRET')!;
      const jwtService = new JwtService({
        secret,
        signOptions: { expiresIn: '60s' },
      });
      const _accessToken = jwtService.sign(payload);
      const res = await Calls.User.delete(app, _accessToken, { id: user.body.id });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.delete} - delete owner`, async () => {
      const expectedError = userDeleteError.OwnerCouldNotBeDeleted();
      const res = await Calls.User.delete(app, accessToken, { id: owner.id });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.delete} - forbidden (call by ADMIN)`, async () => {
      const expectedError = userDeleteError.Forbidden();
      const createUserDto = mockDto.getUserCreateDto(UserRole.USER);
      const { email, password } = createUserDto;

      await Calls.User.create(app, accessToken, createUserDto);
      const userLoginRes = (await Calls.Auth.login(app, { email, password })) as LoginOrRegistrationResponseType;

      const res = await Calls.User.delete(app, userLoginRes.body.accessToken, { id: crypto.randomUUID() });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.delete} - user not found`, async () => {
      const expectedError = userDeleteError.UserNotFound();
      const res = await Calls.User.delete(app, accessToken, { id: crypto.randomUUID() });
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
