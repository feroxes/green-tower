import { Repository } from 'typeorm';
import { Request } from 'express';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule } from '@nestjs/testing';
import { User, UserRole } from '../../src/entities/user.entity';
import { ValidationHelper } from '../validation-helper';
import { mockDto } from '../mock/mock.dtos';
import { userCreateError } from '../../src/api/errors/user.errors';
import { createTestModule, clearDatabase, closeDatabaseConnection } from '../test.config';
import { AuthController } from '../../src/api/controllers/auth.controller';
import { FarmController } from '../../src/api/controllers/farm.controller';
import { UserController } from '../../src/api/controllers/user.controller';

interface RequestUser {
  id: string;
  role: UserRole;
  farmId: string;
}

const CMD = 'user/create';

describe('FarmController', () => {
  let controller: UserController;
  let farmController: FarmController;
  let authController: AuthController;
  let userRepository: Repository<User>;
  let module: TestingModule;
  let mockRequest: Request & { user: RequestUser };
  let user: User;

  beforeAll(async () => {
    module = await createTestModule();
    controller = module.get<UserController>(UserController);
    farmController = module.get<FarmController>(FarmController);
    authController = module.get<AuthController>(AuthController);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    await closeDatabaseConnection(module);
  });

  beforeEach(async () => {
    await clearDatabase(module);
    await authController.register(mockDto.authRegisterDto);
    const foundUser = await userRepository.findOne({
      where: { email: mockDto.authRegisterDto.email },
      relations: ['farm'],
    });
    mockRequest = {
      user: {
        id: foundUser!.id,
        role: foundUser!.role,
        farmId: foundUser!.farm.id,
      },
    } as unknown as Request & { user: RequestUser };
    user = foundUser!;
  });

  describe(CMD, () => {
    it(`${CMD} - HDS`, async () => {
      const userCreateDto = mockDto.getUserCreateDto();
      const user = await controller.create(userCreateDto, mockRequest);
      ValidationHelper.user.validateUserCreation(user);

      const farm = await farmController.get({ id: mockRequest.user.farmId }, mockRequest);
      expect(farm.users.length).toBe(2);
      expect(farm.users[1].id).toBe(user.id);
    });

    it(`${CMD} - owner not found`, async () => {
      const expectedError = userCreateError.OwnerNotFound();
      const userCreateDto = mockDto.getUserCreateDto();
      mockRequest.user.id = crypto.randomUUID();
      await expect(controller.create(userCreateDto, mockRequest)).rejects.toThrow(expectedError.message);
    });

    it(`${CMD} - farm not found`, async () => {
      const expectedError = userCreateError.FarmNotFound();
      const userCreateDto = mockDto.getUserCreateDto();
      mockRequest.user.farmId = crypto.randomUUID();
      await expect(controller.create(userCreateDto, mockRequest)).rejects.toThrow(expectedError.message);
    });

    it(`${CMD} - forbidden (call by ADMIN)`, async () => {
      const expectedError = userCreateError.Forbidden();
      const userCreateDto = mockDto.getUserCreateDto();
      const user = (await controller.create(userCreateDto, mockRequest)) as User;
      mockRequest.user.id = user.id;
      await expect(controller.create(userCreateDto, mockRequest)).rejects.toThrow(expectedError.message);
    });
  });
});
