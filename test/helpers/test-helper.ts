import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../src/entities/farm.entity';
import { Plant } from '../../src/entities/plant.entity';
import { UserRole } from '../../src/entities/user.entity';
import { User } from '../../src/entities/user.entity';

import { UserCreateCmdDto } from '../../src/api/dtos/user.dto';
import { mockDto } from '../mock/mock.dtos';

import { LoginResponseType } from './types/response.types';

import { closeDatabaseConnection } from '../test.config';
import { Calls } from './calls';

type PayloadType = {
  sub: string;
  email: string;
  role: string;
  farmId: string;
};

export class TestHelper {
  owner: User;
  accessToken: string;
  refreshToken: string;
  farm: Farm;
  userRepository: Repository<User>;
  farmRepository: Repository<Farm>;
  plantRepository: Repository<Plant>;
  private jwtService: JwtService;

  constructor(
    private app: INestApplication,
    private module: TestingModule,
  ) {
    const configService = this.module.get(ConfigService);
    const secret: string = configService.get('JWT_SECRET')!;
    this.jwtService = new JwtService({
      secret,
      signOptions: { expiresIn: '60s' },
    });
  }

  async init(): Promise<void> {
    this.userRepository = this.module.get<Repository<User>>(getRepositoryToken(User));
    this.farmRepository = this.module.get<Repository<Farm>>(getRepositoryToken(Farm));
    this.plantRepository = this.module.get<Repository<Plant>>(getRepositoryToken(Plant));
    await Calls.Auth.signUp(this.app);

    const ownerDataObject = await this.userRepository.findOne({ where: { email: mockDto.authRegisterDto.email } });

    await Calls.Auth.confirmEmail(this.app, { token: ownerDataObject!.emailConfirmationToken! });

    const loginResult = (await Calls.Auth.login(this.app)) as LoginResponseType;
    this.accessToken = loginResult.body.accessToken;
    const refreshTokenHeader = loginResult.headers['set-cookie'] as string[];

    if (refreshTokenHeader) {
      this.refreshToken = refreshTokenHeader[0].split('refreshToken=')[1];
    }

    this.owner = (await this.userRepository.findOne({
      where: { email: mockDto.authRegisterDto.email },
      relations: ['farm'],
    })) as User;

    this.farm = (await this.farmRepository.findOne({
      where: { id: this.owner.farm.id },
      relations: ['users', 'plants'],
    })) as Farm;
  }

  async createUser(
    role = UserRole.ADMIN,
    _email?: string,
  ): Promise<{
    user: User;
    accessToken: string;
    credentials: { email: string; password: string };
    createUserDto: UserCreateCmdDto;
  }> {
    const createUserDto = mockDto.getUserCreateDto(role);
    if (_email) createUserDto.email = _email;
    const { email, password } = createUserDto;

    const user = (await Calls.User.create(this.app, this.accessToken, createUserDto)) as { body: User };
    await Calls.Auth.confirmEmail(this.app, { token: user.body.emailConfirmationToken! });
    const userLoginRes = (await Calls.Auth.login(this.app, { email, password })) as LoginResponseType;
    return {
      user: user.body,
      accessToken: userLoginRes.body.accessToken,
      credentials: { email, password },
      createUserDto,
    };
  }

  get getOwner(): User {
    return this.owner;
  }

  get getAccessToken(): string {
    return this.accessToken;
  }

  get getAccessTokenWithWrongFarm(): string {
    const payload = {
      sub: this.owner.id,
      email: this.owner.email,
      role: UserRole.OWNER,
      farmId: crypto.randomUUID(),
    };
    return this.generateToken(payload);
  }

  get getAccessTokenWithWrongOwner(): string {
    const payload = {
      sub: crypto.randomUUID(),
      email: this.owner.email,
      role: UserRole.OWNER,
      farmId: this.farm.id,
    };
    return this.generateToken(payload);
  }

  private generateToken(payload: PayloadType): string {
    return this.jwtService.sign(payload);
  }

  async getFarm(): Promise<Farm> {
    const farm = await this.farmRepository.findOne({
      where: { id: this.owner.farm.id },
      relations: ['users', 'plants'],
    });

    return farm!;
  }

  async getUser(id?: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id || this.owner.id },
      relations: ['farm', 'plants'],
    });

    return user!;
  }
}
