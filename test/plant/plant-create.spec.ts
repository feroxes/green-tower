import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule } from '@nestjs/testing';
import { mockDto } from '../mock/mock.dtos';
import { plantCreateError } from '../../src/api/errors/plant.errors';
import { INestApplication } from '@nestjs/common';
import { ErrorResponse, validateError, validateOwnerGuard, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';
import { Calls } from '../helpers/calls';
import { LoginOrRegistrationResponseType } from '../helpers/types/auth.types';
import { UseCases } from '../helpers/constants';
import { User, UserRole } from '../../src/entities/user.entity';
import { Farm } from '../../src/entities/farm.entity';
import { getAccessTokenWithWrongOwner } from '../helpers/test-helper';

describe('PlantCreate', () => {
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

  describe(UseCases.plant.create, () => {
    it(`${UseCases.plant.create} - HDS`, async () => {
      const res = await Calls.Plant.create(app, accessToken);
      ValidationHelper.plant.validatePlantCreation(res.body);

      const farm = await farmRepository.findOne({ where: { id: owner.farm.id }, relations: ['plants'] });
      const user = await userRepository.findOne({ where: { id: owner.id }, relations: ['plants'] });
      expect(farm!.plants.length).toBe(1);
      expect(farm!.plants[0].id).toBe(res.body.id);
      expect(user!.plants.length).toBe(1);
      expect(user!.plants[0].id).toBe(res.body.id);
    });

    it(`${UseCases.plant.create} - user not found`, async () => {
      const expectedError = plantCreateError.UserNotFound();
      const farm = await farmRepository.findOne({ where: { id: owner.farm.id }, relations: ['users'] });
      const _accessToken = getAccessTokenWithWrongOwner(module, owner, farm!);

      const res = await Calls.Plant.create(app, _accessToken);
      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${UseCases.plant.create} - forbidden (call by USER)`, async () => {
      const createUserDto = mockDto.getUserCreateDto(UserRole.USER);
      const { email, password } = createUserDto;

      await Calls.User.create(app, accessToken, createUserDto);
      const userLoginRes = (await Calls.Auth.login(app, { email, password })) as LoginOrRegistrationResponseType;

      const res = await Calls.Plant.create(app, userLoginRes.body.accessToken);
      validateOwnerGuard(res.body);
    });
  });
});
