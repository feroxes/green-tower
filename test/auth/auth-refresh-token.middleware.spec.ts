import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { Farm } from '../../src/entities/farm.entity';

import { refreshTokenMiddlewareErrors } from '../../src/api/errors/refresh-token-middleware.errors';
import { refreshAccessTokenErrors } from '../../src/api/errors/token-service.errors';

import { JwtPayloadType } from '../../src/api/types/auth.types';
import { ErrorResponse } from '../helpers/types/response.types';

import { UseCases } from '../helpers/constants';
import { TestHelper } from '../helpers/test-helper';
import { validateError, ValidationHelper } from '../helpers/validation-helper';
import { clearDatabase, closeDatabaseConnection, init } from '../test.config';

const useCase = 'token.service';

describe('AuthRefreshTokenMiddleware', () => {
  let app: INestApplication;
  let module: TestingModule;
  let payload: JwtPayloadType;
  let accessToken: string;
  let farm: Farm;
  let testHelper: TestHelper;
  let jwtService: JwtService;

  beforeAll(async () => {
    const testConfig = await init();
    app = testConfig.app;
    module = testConfig.module;
    const configService = module.get(ConfigService);
    const secret: string = configService.get('JWT_SECRET')!;
    jwtService = new JwtService({ secret, signOptions: { expiresIn: '0s' } });
  });

  afterAll(async () => {
    await closeDatabaseConnection(module);
  });

  beforeEach(async () => {
    await clearDatabase(module);
    testHelper = new TestHelper(app, module);
    await testHelper.init();
    payload = {
      sub: testHelper.getOwner.id,
      email: testHelper.getOwner.email,
      role: testHelper.getOwner.role,
      farmId: testHelper.getOwner.farm.id,
    };
    accessToken = jwtService.sign(payload);
    farm = await testHelper.getFarm();
  });

  describe(useCase, () => {
    it(`${useCase} - refreshAccessToken - HDS`, async () => {
      const res = await request(app.getHttpServer())
        .get(UseCases.farm.get)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Cookie', `refreshToken=${testHelper.refreshToken}`)
        .send({ id: farm.id });

      // @ts-ignore - ignore
      ValidationHelper.validateSuccessResponse(res);
    });

    it(`${useCase} - refreshAccessToken - no authorization header`, async () => {
      const expectedError = refreshTokenMiddlewareErrors.NoAuthorizationHeader();

      const res = await request(app.getHttpServer()).get(UseCases.farm.get).send({ id: farm.id });

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${useCase} - refreshAccessToken - no token provided`, async () => {
      const expectedError = refreshTokenMiddlewareErrors.NoTokenProvided();

      const res = await request(app.getHttpServer())
        .get(UseCases.farm.get)
        .set('Authorization', `Bearer`)
        .send({ id: farm.id });

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${useCase} - refreshAccessToken - refresh token verification error`, async () => {
      const expectedError = refreshTokenMiddlewareErrors.NoRefreshTokenProvided();

      const res = await request(app.getHttpServer())
        .get(UseCases.farm.get)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Cookie', `refreshToken=`)
        .send({ id: farm.id });

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${useCase} - refreshAccessToken - refresh token verification failed`, async () => {
      const expectedError = refreshAccessTokenErrors.RefreshTokenVerificationFailed();

      const res = await request(app.getHttpServer())
        .get(UseCases.farm.get)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Cookie', `refreshToken=123`)
        .send({ id: farm.id });

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${useCase} - refreshAccessToken - user does not exist`, async () => {
      const expectedError = refreshAccessTokenErrors.UserDoesNotExist();

      const refreshTokenPayload = {
        sub: crypto.randomUUID(),
        token: '123',
      };
      const refreshToken = jwtService.sign(refreshTokenPayload, {
        expiresIn: '1m',
      });

      const res = await request(app.getHttpServer())
        .get(UseCases.farm.get)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Cookie', `refreshToken=${refreshToken}`)
        .send({ id: farm.id });

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${useCase} - refreshAccessToken - invalid refresh token`, async () => {
      const expectedError = refreshAccessTokenErrors.InvalidRefreshToken();

      const refreshTokenPayload = {
        sub: testHelper.getOwner.id,
        token: '123',
      };
      const refreshToken = jwtService.sign(refreshTokenPayload, {
        expiresIn: '1m',
      });

      const res = await request(app.getHttpServer())
        .get(UseCases.farm.get)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Cookie', `refreshToken=${refreshToken}`)
        .send({ id: farm.id });

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });

    it(`${useCase} - refreshAccessToken - invalid token`, async () => {
      const expectedError = refreshTokenMiddlewareErrors.InvalidToken();

      const res = await request(app.getHttpServer())
        .get(UseCases.farm.get)
        .set('Authorization', `Bearer 123`)
        .set('Cookie', `refreshToken=${testHelper.refreshToken}`)
        .send({ id: farm.id });

      validateError(res.body, expectedError.getResponse() as ErrorResponse);
    });
  });
});
