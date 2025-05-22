import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

describe('AuthLogout', () => {
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

  describe(UseCases.auth.logout, () => {
    it(`${UseCases.auth.logout} - HDS`, async () => {
      const res = await request(app.getHttpServer())
        .post(UseCases.auth.logout)
        .set('Authorization', `Bearer ${testHelper.getAccessToken}`)
        .set('Cookie', `refreshToken=${testHelper.getRefreshToken}`)
        .send();

      const user = await testHelper.loadUser();
      const cookies = res.headers['set-cookie'] as unknown as [string];
      const refreshCookie = cookies.find((c) => c.startsWith('refreshToken='));

      expect(user.refreshToken).toBeNull();
      expect(refreshCookie).toBeDefined();
      expect(refreshCookie).toMatch(/^refreshToken=;/);
      expect(refreshCookie).toMatch(/Expires=.*1970/);
    });

    it(`${UseCases.auth.logout} - no refresh token`, async () => {
      const res = await request(app.getHttpServer())
        .post(UseCases.auth.logout)
        .set('Authorization', `Bearer ${testHelper.getAccessToken}`)
        .send();

      const cookies = res.headers['set-cookie'] as unknown as [string];
      const refreshCookie = cookies.find((c) => c.startsWith('refreshToken='));
      expect(refreshCookie).toBeDefined();
      expect(refreshCookie).toMatch(/^refreshToken=;/);
      expect(refreshCookie).toMatch(/Expires=.*1970/);
    });

    it(`${UseCases.auth.logout} - invalid refresh token`, async () => {
      const res = await request(app.getHttpServer())
        .post(UseCases.auth.logout)
        .set('Authorization', `Bearer ${testHelper.getAccessToken}`)
        .set('Cookie', `refreshToken=invalid_refresh_token`)
        .send();

      const cookies = res.headers['set-cookie'] as unknown as [string];
      const refreshCookie = cookies.find((c) => c.startsWith('refreshToken='));
      expect(refreshCookie).toBeDefined();
      expect(refreshCookie).toMatch(/^refreshToken=;/);
      expect(refreshCookie).toMatch(/Expires=.*1970/);
    });
  });
});
