import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import { User } from '../../src/entities/user.entity';

import { GuardErrorResponseType } from '../helpers/types/response.types';
import { ListResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateOwnerGuard, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('UserList', () => {
  let app: INestApplication;
  let module: TestingModule;
  let userAccessToken: string;
  let testHelper: TestHelper;

  beforeAll(async () => {
    const testConfig = await init();
    app = testConfig.app;
    module = testConfig.module;
  });

  afterAll(async () => {
    await closeDatabaseConnection(module);
  });

  beforeEach(async () => {
    await clearDatabase(module);
    testHelper = new TestHelper(app, module);
    await testHelper.init();
    const res = await testHelper.createUser();
    userAccessToken = res.accessToken;
  });

  describe(UseCases.user.list, () => {
    it(`${UseCases.user.list} - HDS`, async () => {
      const res = (await Calls.User.list(app, testHelper.getAccessToken)) as ListResponseType<User>;
      res.body.itemList.forEach((user) => {
        ValidationHelper.user.validateUserGet(user);
      });
      expect(res.body.itemList.length).toBe(2);
    });

    it(`${UseCases.user.list} - call by user`, async () => {
      const res = (await Calls.User.list(app, userAccessToken)) as GuardErrorResponseType;
      validateOwnerGuard(res.body);
    });
  });
});
