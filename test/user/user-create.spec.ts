import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule } from '@nestjs/testing';
import { User, UserRole } from '../../src/entities/user.entity';
import { mockDto } from '../mock/mock.dtos';
import { userCreateError } from '../../src/api/errors/user.errors';
import { UserCreateComponentError } from '../../src/api/errors/user-component.errors';
import { INestApplication } from '@nestjs/common';
import { ErrorResponse, validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';
import { Calls } from '../helpers/calls';
import { LoginOrRegistrationResponseType } from '../helpers/types/auth.types';
import { UseCases } from '../helpers/constants';
import { Farm } from '../../src/entities/farm.entity';

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
      const expectedError = userCreateError.OwnerNotFound();
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
      const res = await Calls.User.create(app, _accessToken);
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.create} - owner not found (wrong farm id)`, async () => {
      const expectedError = userCreateError.OwnerNotFound();
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
      const res = await Calls.User.create(app, _accessToken);
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.user.create} - forbidden (call by ADMIN)`, async () => {
      const expectedError = userCreateError.Forbidden();
      const createUserDto = mockDto.getUserCreateDto(UserRole.USER);
      const { email, password } = createUserDto;

      await Calls.User.create(app, accessToken, createUserDto);
      const userLoginRes = (await Calls.Auth.login(app, { email, password })) as LoginOrRegistrationResponseType;

      const res = await Calls.User.create(app, userLoginRes.body.accessToken, createUserDto);
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
