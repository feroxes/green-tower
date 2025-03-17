import { TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/services/auth/auth.service';
import { ValidationHelper } from '../validation-helper';
import { mockDto } from '../mock/mock.dtos';
import { loginError } from '../../src/api/errors/auth.errors';
import { createTestModule, clearDatabase, closeDatabaseConnection } from '../test.config';

const CMD = 'auth/login';

describe('AuthLoginService', () => {
  let service: AuthService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await createTestModule();
    service = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await closeDatabaseConnection(module);
  });

  beforeEach(async () => {
    await clearDatabase(module);
    await service.register(mockDto.authRegisterDto);
  });

  it('AuthLoginService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(CMD, () => {
    it(`${CMD} - HDS`, async () => {
      const response = await service.login(mockDto.authLoginDto);
      ValidationHelper.auth.validateResponse(response);
    });

    it(`${CMD} - wrong email`, async () => {
      const expectedError = loginError.InvalidCredentials();
      await expect(service.login({ ...mockDto.authLoginDto, email: 'wrongEmail@gmail.com' })).rejects.toThrow(
        expectedError.message,
      );
    });

    it(`${CMD} - wrong password`, async () => {
      const expectedError = loginError.InvalidCredentials();
      await expect(service.login({ ...mockDto.authLoginDto, password: 'wrongPassword' })).rejects.toThrow(
        expectedError.message,
      );
    });
  });
});
