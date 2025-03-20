import { TestingModule } from '@nestjs/testing';
import { ValidationHelper } from '../helpers/validation-helper';
import { mockDto } from '../mock/mock.dtos';
import { loginError } from '../../src/api/errors/auth.errors';
import { createTestModule, clearDatabase, closeDatabaseConnection } from '../test.config';
import { AuthController } from '../../src/api/controllers/auth.controller';

const CMD = 'auth/login';

describe('AuthLoginController', () => {
  let controller: AuthController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await createTestModule();
    controller = module.get<AuthController>(AuthController);
  });

  afterAll(async () => {
    await closeDatabaseConnection(module);
  });

  beforeEach(async () => {
    await clearDatabase(module);
    await controller.register(mockDto.authRegisterDto);
  });

  describe(CMD, () => {
    it(`${CMD} - HDS`, async () => {
      const response = await controller.login(mockDto.authLoginDto);
      ValidationHelper.auth.validateResponse(response);
    });

    it(`${CMD} - wrong email`, async () => {
      const expectedError = loginError.InvalidCredentials();
      await expect(controller.login({ ...mockDto.authLoginDto, email: 'wrongEmail@gmail.com' })).rejects.toThrow(
        expectedError.message,
      );
    });

    it(`${CMD} - wrong password`, async () => {
      const expectedError = loginError.InvalidCredentials();
      await expect(controller.login({ ...mockDto.authLoginDto, password: 'wrongPassword' })).rejects.toThrow(
        expectedError.message,
      );
    });
  });
});
