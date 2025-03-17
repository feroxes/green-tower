import { Repository } from 'typeorm';
import { Request } from 'express';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule } from '@nestjs/testing';
import { User, UserRole } from '../../src/entities/user.entity';
import { ValidationHelper } from '../validation-helper';
import { getError } from '../../src/api/errors/farm.errors';
import { mockDto } from '../mock/mock.dtos';
import { createTestModule, clearDatabase, closeDatabaseConnection } from '../test.config';
import { AuthController } from '../../src/api/controllers/auth.controller';
import { FarmController } from '../../src/api/controllers/farm.controller';

interface RequestUser {
  id: string;
  role: UserRole;
}

const CMD = 'farm/get';

describe('FarmController', () => {
  let controller: FarmController;
  let authController: AuthController;
  let userRepository: Repository<User>;
  let module: TestingModule;
  let mockRequest: Request & { user: RequestUser };
  let user: User;

  beforeAll(async () => {
    module = await createTestModule();
    controller = module.get<FarmController>(FarmController);
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
      },
    } as unknown as Request & { user: RequestUser };
    user = foundUser!;
  });

  describe(CMD, () => {
    it(`${CMD} - HDS`, async () => {
      const farm = await controller.get({ id: user.farm.id }, mockRequest);
      ValidationHelper.farm.validateFarm(farm);
    });

    it(`${CMD} - farm not found`, async () => {
      const expectedError = getError.FarmNotFound();
      await expect(controller.get({ id: crypto.randomUUID() }, mockRequest)).rejects.toThrow(expectedError.message);
    });

    it(`${CMD} - forbidden`, async () => {
      const expectedError = getError.Forbidden();
      mockRequest.user.role = UserRole.USER;
      await expect(controller.get({ id: user.farm.id }, mockRequest)).rejects.toThrow(expectedError.message);
    });
  });
});
