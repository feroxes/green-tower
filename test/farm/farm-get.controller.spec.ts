import { ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule } from '@nestjs/testing';
import { User, UserRole } from '../../src/entities/user.entity';
import { ValidationHelper } from '../helpers/validation-helper';
import { getError } from '../../src/api/errors/farm.errors';
import { createTestModule, clearDatabase, closeDatabaseConnection } from '../test.config';
import { registerAndFetchUser } from '../helpers/setup-user';
import { AuthController } from '../../src/api/controllers/auth.controller';
import { FarmController } from '../../src/api/controllers/farm.controller';
import { mockDto } from '../mock/mock.dtos';

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
    user = await registerAndFetchUser(module);
    mockRequest = {
      user: {
        id: user!.id,
        role: user!.role,
      },
    } as unknown as Request & { user: RequestUser };
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

    it(`${CMD} - forbidden (getting foreign farm)`, async () => {
      const expectedError = getError.Forbidden();
      const email = 'test@test.com';
      await authController.register({ ...mockDto.authRegisterDto, email });
      const _user = await userRepository.findOne({
        where: { email },
        relations: ['farm'],
      });
      mockRequest.user.id = _user!.id;
      await expect(controller.get({ id: user!.farm.id }, mockRequest)).rejects.toThrow(expectedError.message);
    });
  });
});
