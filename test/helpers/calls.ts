import * as request from 'supertest';
import { Response } from 'supertest';
import { INestApplication } from '@nestjs/common';
import { UseCases } from './constants';
import { mockDto } from '../mock/mock.dtos';
import { LoginOrRegistrationResponseType } from './types/auth.types';
import { PlantCreateResponseType, UserCreateResponseType } from './types/user.types';
import { UserRole } from '../../src/entities/user.entity';

export const Calls = {
  call(
    app: INestApplication,
    useCase: string,
    method: 'post' | 'get',
    body: object,
    accessToken?: string,
  ): Promise<Response> {
    return request(app.getHttpServer())[method](useCase).set('Authorization', `Bearer ${accessToken}`).send(body);
  },
  get(app: INestApplication, useCase: string, body: object, accessToken?: string): Promise<Response> {
    return Calls.call(app, useCase, 'get', body, accessToken);
  },
  post(app: INestApplication, useCase: string, body: object, accessToken?: string): Promise<Response> {
    return Calls.call(app, useCase, 'post', body, accessToken);
  },
  Auth: {
    async signUp(
      app: INestApplication,
      body = mockDto.authRegisterDto,
    ): Promise<LoginOrRegistrationResponseType | Response> {
      return Calls.post(app, UseCases.auth.signUp, body);
    },
    async login(
      app: INestApplication,
      body = mockDto.authLoginDto,
    ): Promise<LoginOrRegistrationResponseType | Response> {
      return Calls.post(app, UseCases.auth.login, body);
    },
  },
  Farm: {
    async get(app: INestApplication, body: { id: string }, accessToken: string): Promise<Response> {
      return Calls.get(app, UseCases.farm.get, body, accessToken);
    },
  },
  User: {
    async create(
      app: INestApplication,
      accessToken: string,
      body = mockDto.getUserCreateDto(),
    ): Promise<UserCreateResponseType | Response> {
      return Calls.post(app, UseCases.user.create, body, accessToken);
    },
    async delete(app: INestApplication, accessToken: string, body: { id: string }): Promise<Response> {
      return Calls.post(app, UseCases.user.delete, body, accessToken);
    },
    async setRole(
      app: INestApplication,
      accessToken: string,
      body: { id: string; role: UserRole.ADMIN | UserRole.USER },
    ): Promise<Response> {
      return Calls.post(app, UseCases.user.setRole, body, accessToken);
    },
  },
  Plant: {
    async create(
      app: INestApplication,
      accessToken: string,
      body = mockDto.plantCreateDto,
    ): Promise<PlantCreateResponseType | Response> {
      return Calls.post(app, UseCases.plant.create, body, accessToken);
    },
  },
};
