import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Response } from 'supertest';

import { UserRole } from '../../src/entities/user.entity';

import { UserUpdateDto } from '../../src/api/dtos/user.dto';
import { mockDto } from '../mock/mock.dtos';

import {
  EmptyResponseType,
  ErrorResponseType,
  FarmResponseType,
  GuardErrorResponseType,
  LoginResponseType,
  PlantResponseType,
  UserResponseType,
} from './types/response.types';

import { UseCases } from './constants';

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
    ): Promise<EmptyResponseType | ErrorResponseType> {
      return Calls.post(app, UseCases.auth.signUp, body);
    },
    async login(app: INestApplication, body = mockDto.authLoginDto): Promise<LoginResponseType | ErrorResponseType> {
      return Calls.post(app, UseCases.auth.login, body);
    },
    async confirmEmail(app: INestApplication, body: { token: string }): Promise<EmptyResponseType | ErrorResponseType> {
      return Calls.get(app, `${UseCases.auth.confirmEmail}/${body.token}`, body);
    },
    async resendConfirmationEmail(
      app: INestApplication,
      body: { email: string },
    ): Promise<EmptyResponseType | ErrorResponseType> {
      return Calls.get(app, UseCases.auth.resendConfirmationEmail, body);
    },
  },
  Farm: {
    async get(
      app: INestApplication,
      body: { id: string },
      accessToken: string,
    ): Promise<FarmResponseType | ErrorResponseType | GuardErrorResponseType> {
      return Calls.get(app, UseCases.farm.get, body, accessToken);
    },
  },
  User: {
    async create(
      app: INestApplication,
      accessToken: string,
      body = mockDto.getUserCreateDto(),
    ): Promise<UserResponseType | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.user.create, body, accessToken);
    },
    async update(
      app: INestApplication,
      accessToken: string,
      body: UserUpdateDto,
    ): Promise<UserResponseType | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.user.update, body, accessToken);
    },
    async get(
      app: INestApplication,
      accessToken: string,
      body: { id?: string } = {},
    ): Promise<UserResponseType | ErrorResponseType | GuardErrorResponseType> {
      return Calls.get(app, UseCases.user.get, body, accessToken);
    },
    async delete(
      app: INestApplication,
      accessToken: string,
      body: { id: string },
    ): Promise<EmptyResponseType | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.user.delete, body, accessToken);
    },
    async setRole(
      app: INestApplication,
      accessToken: string,
      body: { id: string; role: UserRole.ADMIN | UserRole.USER },
    ): Promise<UserResponseType | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.user.setRole, body, accessToken);
    },
  },
  Plant: {
    async create(
      app: INestApplication,
      accessToken: string,
      body = mockDto.plantCreateDto,
    ): Promise<PlantResponseType | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.plant.create, body, accessToken);
    },
  },
};
