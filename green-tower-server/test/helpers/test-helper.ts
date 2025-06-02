import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../src/entities/farm.entity';
import { HarvestEntry } from '../../src/entities/harvest-entry.entity';
import { Plant } from '../../src/entities/plant.entity';
import { Planting } from '../../src/entities/planting.entity';
import { User, UserRole } from '../../src/entities/user.entity';

import { UserCreateCmdDto } from '../../src/api/dtos/user.dto';
import { mockDto } from '../mock/mock.dtos';

import { LoginResponseType, ObjectResponseType } from './types/response.types';

import { PlantingType } from '../../src/entities/enums/planting-type.enum';
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
  userRepository: Repository<User>;
  farm: Farm;
  farmRepository: Repository<Farm>;
  plant: Plant;
  plantRepository: Repository<Plant>;
  planting: Planting;
  plantingRepository: Repository<Planting>;
  harvestEntry: HarvestEntry;
  harvestEntryRepository: Repository<HarvestEntry>;
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
    this.plantingRepository = this.module.get<Repository<Planting>>(getRepositoryToken(Planting));
    this.harvestEntryRepository = this.module.get<Repository<HarvestEntry>>(getRepositoryToken(HarvestEntry));
    await Calls.Auth.signUp(this.app);

    const ownerDataObject = await this.userRepository.findOne({ where: { email: mockDto.authRegisterDto.email } });

    await Calls.Auth.confirmEmail(this.app, { token: ownerDataObject!.emailConfirmationToken! });

    const loginResult = (await Calls.Auth.login(this.app)) as LoginResponseType;
    this.accessToken = loginResult.body.accessToken;
    const refreshTokenHeader = loginResult.headers['set-cookie'] as string[];

    if (refreshTokenHeader) {
      const cookieStr = refreshTokenHeader[0];
      const match = cookieStr.match(/refreshToken=([^;]+)/);
      if (match) {
        this.refreshToken = match[1];
      }
    }

    const plant = (await Calls.Plant.create(this.app, this.accessToken)) as ObjectResponseType<Plant>;

    const planting = (await Calls.Planting.create(this.app, this.getAccessToken, {
      ...mockDto.plantingCreateDto,
      plantId: plant.body.id,
    })) as ObjectResponseType<Planting>;

    this.owner = (await this.userRepository.findOne({
      where: { email: mockDto.authRegisterDto.email },
      relations: ['farm'],
    })) as User;

    this.farm = (await this.farmRepository.findOne({
      where: { id: this.owner.farm.id },
      relations: ['users', 'plants'],
    })) as Farm;

    this.plant = (await this.plantRepository.findOne({
      where: { id: plant.body.id },
      relations: ['createdBy'],
    })) as Plant;

    this.planting = (await this.plantingRepository.findOne({ where: { id: planting.body.id } })) as Planting;
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

  get getPlant(): Plant {
    return this.plant;
  }

  get getPlanting(): Planting {
    return this.planting;
  }

  get getAccessToken(): string {
    return this.accessToken;
  }

  get getRefreshToken(): string {
    return this.refreshToken;
  }

  get getAccessTokenWithWrongFarm(): string {
    const payload = {
      sub: this.owner.id,
      email: this.owner.email,
      role: UserRole.OWNER,
      farmId: this.getRandomId(),
    };
    return this.generateToken(payload);
  }

  get getAccessTokenWithWrongOwner(): string {
    const payload = {
      sub: this.getRandomId(),
      email: this.owner.email,
      role: UserRole.OWNER,
      farmId: this.farm.id,
    };
    return this.generateToken(payload);
  }

  private generateToken(payload: PayloadType): string {
    return this.jwtService.sign(payload);
  }

  async loadFarm(): Promise<Farm> {
    const farm = await this.farmRepository.findOne({
      where: { id: this.owner.farm.id },
      relations: ['users', 'plants', 'plantings', 'harvestEntries'],
    });

    return farm!;
  }

  async loadUser(id?: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id || this.owner.id },
      relations: ['farm', 'plants', 'plantings'],
    });

    return user!;
  }

  async loadPlanting(): Promise<Planting> {
    const planting = await this.plantingRepository.findOne({
      where: { id: this.planting.id },
    });

    return planting!;
  }

  async createHarvestPlateEntry(): Promise<HarvestEntry> {
    const planting = (await Calls.Planting.create(this.app, this.getAccessToken, {
      ...mockDto.plantingCreateDto,
      plantId: this.getPlant.id,
    })) as ObjectResponseType<Planting>;

    await Calls.Planting.harvest(this.app, this.getAccessToken, {
      id: planting.body.id,
      type: PlantingType.PLATE,
      harvestGram: 200,
      amountOfPlates: mockDto.plantingCreateDto.amountOfPlates,
    });

    return (await this.harvestEntryRepository.findOne({
      where: { planting: { id: planting.body.id } },
      relations: ['planting', 'plant', 'farm'],
    })) as HarvestEntry;
  }

  async createHarvestCutEntry(): Promise<HarvestEntry> {
    const planting = (await Calls.Planting.create(this.app, this.getAccessToken, {
      ...mockDto.plantingCreateDto,
      plantId: this.getPlant.id,
      type: PlantingType.CUT,
    })) as ObjectResponseType<Planting>;

    await Calls.Planting.harvest(this.app, this.getAccessToken, {
      id: planting.body.id,
      type: PlantingType.CUT,
      harvestGram: 200,
    });

    return (await this.harvestEntryRepository.findOne({
      where: { planting: { id: planting.body.id } },
      relations: ['planting', 'plant', 'farm'],
    })) as HarvestEntry;
  }

  getRandomId() {
    return crypto.randomUUID();
  }
}
