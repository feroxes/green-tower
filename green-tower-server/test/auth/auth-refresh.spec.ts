import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { EmptyResponseType } from '../helpers/types/response.types';

import { Calls } from '../helpers/calls';
import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('AuthRefresh', () => {
  let app: INestApplication;
  let module: TestingModule;
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
  });

  describe(UseCases.auth.refresh, () => {
    it(`${UseCases.auth.refresh} - HDS`, async () => {
      const res = await request(app.getHttpServer())
        .post(UseCases.auth.refresh)
        .set('Authorization', `Bearer ${testHelper.getAccessToken}`)
        .set('Cookie', `refreshToken=${testHelper.getRefreshToken}`)
        .send();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(res.body.newAccessToken).toBeDefined();
    });
  });
});
