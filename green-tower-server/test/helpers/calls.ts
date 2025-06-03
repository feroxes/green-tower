import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Response } from 'supertest';

import { Customer } from '@entities/customer.entity';
import { Farm } from '@entities/farm.entity';
import { HarvestEntry } from '@entities/harvest-entry.entity';
import { Order } from '@entities/order.entity';
import { Plant } from '@entities/plant.entity';
import { Planting } from '@entities/planting.entity';
import { User, UserRole } from '@entities/user.entity';

import { HarvestGroup } from '@services/harvest-entry/harvest-entry-list-grouped.service';

import { mockDto } from '../mock/mock.dtos';
import { CustomerCreateDto, CustomerDeleteDto, CustomerListDto, CustomerUpdateDto } from '@dtos/customer.dto';
import { HarvestEntryCreateCutDto, HarvestEntryCreatePlateDto, HarvestEntryCutPlateDto } from '@dtos/harvest-entry.dto';
import { OrderCreateDto, OrderListDto } from '@dtos/order.dto';
import { PlantDeleteDto, PlantGetDto, PlantListDto, PlantUpdateDto } from '@dtos/plant.dto';
import {
  PlantingDeleteDto,
  PlantingGetDto,
  PlantingHarvestDto,
  PlantingListDto,
  PlantingSetStateDto,
  PlantingUpdateDto,
} from '@dtos/planting.dto';
import { UserUpdateDto } from '@dtos/user.dto';

import {
  EmptyResponseType,
  ErrorResponseType,
  GuardErrorResponseType,
  ListResponseType,
  LoginResponseType,
  ObjectResponseType,
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
    async logout(app: INestApplication, accessToken: string): Promise<EmptyResponseType | ErrorResponseType> {
      return Calls.post(app, UseCases.auth.logout, {}, accessToken);
    },
    async refresh(app: INestApplication, accessToken: string): Promise<EmptyResponseType | ErrorResponseType> {
      return Calls.post(app, UseCases.auth.refresh, {}, accessToken);
    },
    async confirmEmail(app: INestApplication, body: { token: string }): Promise<EmptyResponseType | ErrorResponseType> {
      return Calls.get(app, `${UseCases.auth.confirmEmail}/${body.token}`, body);
    },
    async resendConfirmationEmail(
      app: INestApplication,
      body: { email: string },
    ): Promise<EmptyResponseType | ErrorResponseType> {
      return Calls.post(app, UseCases.auth.resendConfirmationEmail, body);
    },
  },
  Farm: {
    async get(
      app: INestApplication,
      body: { id: string },
      accessToken: string,
    ): Promise<ObjectResponseType<Farm> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.get(app, UseCases.farm.get, body, accessToken);
    },
  },
  User: {
    async create(
      app: INestApplication,
      accessToken: string,
      body = mockDto.getUserCreateDto(),
    ): Promise<ObjectResponseType<User> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.user.create, body, accessToken);
    },
    async update(
      app: INestApplication,
      accessToken: string,
      body: UserUpdateDto,
    ): Promise<ObjectResponseType<User> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.user.update, body, accessToken);
    },
    async get(
      app: INestApplication,
      accessToken: string,
      body: { id?: string } = {},
    ): Promise<ObjectResponseType<User> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.get(app, UseCases.user.get, body, accessToken);
    },
    async list(
      app: INestApplication,
      accessToken: string,
    ): Promise<ListResponseType<User> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.get(app, UseCases.user.list, {}, accessToken);
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
    ): Promise<ObjectResponseType<User> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.user.setRole, body, accessToken);
    },
  },
  Plant: {
    async create(
      app: INestApplication,
      accessToken: string,
      body = mockDto.plantCreateDto,
    ): Promise<ObjectResponseType<Plant> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.plant.create, body, accessToken);
    },
    async update(
      app: INestApplication,
      accessToken: string,
      body: PlantUpdateDto,
    ): Promise<ObjectResponseType<Plant> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.plant.update, body, accessToken);
    },
    async get(
      app: INestApplication,
      accessToken: string,
      body: PlantGetDto,
    ): Promise<ObjectResponseType<Plant> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.get(app, UseCases.plant.get, body, accessToken);
    },
    async list(
      app: INestApplication,
      accessToken: string,
      body: PlantListDto,
    ): Promise<ListResponseType<Plant> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.get(app, UseCases.plant.list, body, accessToken);
    },
    async delete(
      app: INestApplication,
      accessToken: string,
      body: PlantDeleteDto,
    ): Promise<EmptyResponseType | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.plant.delete, body, accessToken);
    },
  },
  Planting: {
    async create(
      app: INestApplication,
      accessToken: string,
      body = mockDto.plantingCreateDto,
    ): Promise<ObjectResponseType<Planting> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.planting.create, body, accessToken);
    },
    async update(
      app: INestApplication,
      accessToken: string,
      body: PlantingUpdateDto,
    ): Promise<ObjectResponseType<Planting> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.planting.update, body, accessToken);
    },
    async get(
      app: INestApplication,
      accessToken: string,
      body: PlantingGetDto,
    ): Promise<ObjectResponseType<Planting> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.get(app, UseCases.planting.get, body, accessToken);
    },
    async delete(
      app: INestApplication,
      accessToken: string,
      body: PlantingDeleteDto,
    ): Promise<EmptyResponseType | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.planting.delete, body, accessToken);
    },
    async list(
      app: INestApplication,
      accessToken: string,
      body: PlantingListDto,
    ): Promise<ListResponseType<Planting> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.get(app, UseCases.planting.list, body, accessToken);
    },
    async setState(
      app: INestApplication,
      accessToken: string,
      body: PlantingSetStateDto,
    ): Promise<ObjectResponseType<Planting> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.planting.setState, body, accessToken);
    },
    async harvest(
      app: INestApplication,
      accessToken: string,
      body: PlantingHarvestDto,
    ): Promise<ObjectResponseType<Planting> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.planting.harvest, body, accessToken);
    },
  },
  HarvestEntry: {
    async createCut(
      app: INestApplication,
      accessToken: string,
      body: HarvestEntryCreateCutDto,
    ): Promise<ObjectResponseType<HarvestEntry> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.harvestEntry.createCut, body, accessToken);
    },
    async createPlate(
      app: INestApplication,
      accessToken: string,
      body: HarvestEntryCreatePlateDto,
    ): Promise<ObjectResponseType<HarvestEntry> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.harvestEntry.createPlate, body, accessToken);
    },
    async cutPlate(
      app: INestApplication,
      accessToken: string,
      body: HarvestEntryCutPlateDto,
    ): Promise<ObjectResponseType<HarvestEntry> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.harvestEntry.cutPlate, body, accessToken);
    },
    async listGroupedByPlant(
      app: INestApplication,
      accessToken: string,
    ): Promise<ListResponseType<HarvestGroup> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.get(app, UseCases.harvestEntry.listGroupedByPlant, {}, accessToken);
    },
  },
  Customer: {
    async create(
      app: INestApplication,
      accessToken: string,
      body: CustomerCreateDto = mockDto.customerCreateDto,
    ): Promise<ObjectResponseType<Customer> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.customer.create, body, accessToken);
    },
    async update(
      app: INestApplication,
      accessToken: string,
      body: CustomerUpdateDto = mockDto.customerUpdateDto,
    ): Promise<ObjectResponseType<Customer> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.customer.update, body, accessToken);
    },
    async delete(
      app: INestApplication,
      accessToken: string,
      body: CustomerDeleteDto,
    ): Promise<EmptyResponseType | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.customer.delete, body, accessToken);
    },
    async list(
      app: INestApplication,
      accessToken: string,
      body: CustomerListDto,
    ): Promise<ListResponseType<Customer> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.get(app, UseCases.customer.list, body, accessToken);
    },
  },
  Order: {
    async create(
      app: INestApplication,
      accessToken: string,
      body: OrderCreateDto,
    ): Promise<ObjectResponseType<Order> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.post(app, UseCases.order.create, body, accessToken);
    },
    async list(
      app: INestApplication,
      accessToken: string,
      body: OrderListDto,
    ): Promise<ListResponseType<Order> | ErrorResponseType | GuardErrorResponseType> {
      return Calls.get(app, UseCases.order.list, body, accessToken);
    },
  },
};
