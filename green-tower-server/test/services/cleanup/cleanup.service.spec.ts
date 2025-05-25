import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../../src/entities/farm.entity';
import { User } from '../../../src/entities/user.entity';

import { CleanupService } from '../../../src/services/cleanup/cleanup.service';

import { mockDto } from '../../mock/mock.dtos';

import { Calls } from '../../helpers/calls';
import { clearDatabase, closeDatabaseConnection, init } from '../../test.config';

describe('AuthCleanup', () => {
  let app: INestApplication;
  let module: TestingModule;
  let userRepository: Repository<User>;
  let farmRepository: Repository<Farm>;
  let service: CleanupService;

  beforeAll(async () => {
    const testConfig = await init();
    app = testConfig.app;
    module = testConfig.module;
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    farmRepository = module.get<Repository<Farm>>(getRepositoryToken(Farm));
    service = module.get<CleanupService>(CleanupService);
  });

  afterAll(async () => {
    await closeDatabaseConnection(module);
  });

  beforeEach(async () => {
    await clearDatabase(module);
    await Calls.Auth.signUp(app);
  });

  describe('removeUnconfirmedUsers', () => {
    it(`${'removeUnconfirmedUsers'} - HDS`, async () => {
      const user = (await userRepository.findOne({ where: { email: mockDto.authRegisterDto.email } })) as User;
      const wrongDate = new Date();
      wrongDate.setFullYear(wrongDate.getFullYear() - 1);
      user.emailConfirmationExpires = wrongDate;
      await userRepository.save(user);

      await service.removeUnconfirmedUsers();
      const _user = await userRepository.findOne({ where: { email: mockDto.authRegisterDto.email } });
      const farm = await farmRepository.findOne({ where: { name: mockDto.authRegisterDto.farmName } });

      expect(_user).toBeNull();
      expect(farm).toBeNull();
    });
  });
});
