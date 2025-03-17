import { TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthSignupService } from '../../src/services/auth/auth-signup.service';
import { User } from '../../src/entities/user.entity';
import { Farm } from '../../src/entities/farm.entity';
import { ValidationHelper } from '../validation-helper';
import { mockDto } from '../mock/mock.dtos';
import { registerError } from '../../src/api/errors/auth.errors';
import { createTestModule, clearDatabase, closeDatabaseConnection } from '../test.config';

const CMD = 'auth/signup';

describe('AuthSignupService', () => {
  let service: AuthSignupService;
  let module: TestingModule;
  let farmRepository: Repository<Farm>;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    module = await createTestModule();
    service = module.get<AuthSignupService>(AuthSignupService);
    farmRepository = module.get<Repository<Farm>>(getRepositoryToken(Farm));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    await closeDatabaseConnection(module);
  });

  beforeEach(async () => {
    await clearDatabase(module);
  });

  it('AuthSignupService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(CMD, () => {
    it(`${CMD} - HDS`, async () => {
      const response = await service.register(mockDto.authRegisterDto);

      const farm = await farmRepository.findOne({
        where: { name: mockDto.authRegisterDto.farmName },
      });

      const user = await userRepository.findOne({
        where: { email: mockDto.authRegisterDto.email },
        relations: ['farm'],
      });

      ValidationHelper.auth.validateResponse(response);
      ValidationHelper.farm.validateFarm(farm as Farm);
      ValidationHelper.user.validateUser(user as User, farm as Farm);
    });

    it(`${CMD} - user already exists error`, async () => {
      await service.register(mockDto.authRegisterDto);
      const expectedError = registerError.UserAlreadyExists();
      await expect(service.register(mockDto.authRegisterDto)).rejects.toThrow(expectedError.message);
    });
  });
});
