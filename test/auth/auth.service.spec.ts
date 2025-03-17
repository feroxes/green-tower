import { TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthSignupService } from '../../src/services/auth/auth-signup.service';
import { User, UserRole } from '../../src/entities/user.entity';
import { Farm } from '../../src/entities/farm.entity';
import { RegisterDto } from '../../src/dtos/auth.dto';
import {
  createTestModule,
  clearDatabase,
  closeDatabaseConnection,
} from '../test.config';

describe('AuthSignupService', () => {
  let service: AuthSignupService;
  let jwtService: JwtService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await createTestModule();
    service = module.get<AuthSignupService>(AuthSignupService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await closeDatabaseConnection(module);
  });

  beforeEach(async () => {
    await clearDatabase(module);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    const mockRegisterDto: RegisterDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      farmName: 'Test Farm',
    };

    it('should successfully register a new user and create a farm', async () => {
      const farmRepository = module.get<Repository<Farm>>(
        getRepositoryToken(Farm),
      );
      const userRepository = module.get<Repository<User>>(
        getRepositoryToken(User),
      );

      const result = await service.register(mockRegisterDto);

      expect(result).toHaveProperty('accessToken');
      expect(result.accessToken).toBeDefined();

      const farm = await farmRepository.findOne({
        where: { name: mockRegisterDto.farmName },
      });
      expect(farm).toBeDefined();
      expect(farm).not.toBeNull();
      expect(farm!.name).toBe(mockRegisterDto.farmName);

      const user = await userRepository.findOne({
        where: { email: mockRegisterDto.email },
        relations: ['farm'],
      });

      expect(user).toBeDefined();
      expect(user).not.toBeNull();
      expect(user!.firstName).toBe(mockRegisterDto.firstName);
      expect(user!.lastName).toBe(mockRegisterDto.lastName);
      expect(user!.email).toBe(mockRegisterDto.email);
      expect(user!.role).toBe(UserRole.ADMIN);
      expect(user!.farm.id).toBe(farm!.id);
    });

    it('should throw ConflictException if user already exists', async () => {
      await service.register(mockRegisterDto);
      await expect(service.register(mockRegisterDto)).rejects.toThrow(
        'User with this email already exists',
      );
    });
  });
});
