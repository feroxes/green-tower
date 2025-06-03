import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../../src/entities/customer.entity';
import { Farm } from '../../src/entities/farm.entity';
import { HarvestEntry } from '../../src/entities/harvest-entry.entity';
import { Plant } from '../../src/entities/plant.entity';
import { Planting } from '../../src/entities/planting.entity';
import { User, UserRole } from '../../src/entities/user.entity';
import { Order } from '@entities/order.entity';

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
  customer: Customer;
  customerRepository: Repository<Customer>;
  order: Order;
  orderRepository: Repository<Order>;
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
    await this.userInit();
    await this.farmInit();
    await this.plantInit();
    await this.plantingInit();
    this.harvestEntryInit();
    await this.customerInit();
    this.orderInit();
  }

  private async userInit() {
    this.userRepository = this.module.get<Repository<User>>(getRepositoryToken(User));
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
    this.owner = (await this.userRepository.findOne({
      where: { email: mockDto.authRegisterDto.email },
      relations: ['farm'],
    })) as User;
  }

  private async farmInit() {
    this.farmRepository = this.module.get<Repository<Farm>>(getRepositoryToken(Farm));
    this.farm = (await this.farmRepository.findOne({
      where: { id: this.owner.farm.id },
      relations: ['users', 'plants'],
    })) as Farm;
  }

  private async plantInit() {
    this.plantRepository = this.module.get<Repository<Plant>>(getRepositoryToken(Plant));
    const plant = (await Calls.Plant.create(this.app, this.accessToken)) as ObjectResponseType<Plant>;
    this.plant = (await this.plantRepository.findOne({
      where: { id: plant.body.id },
      relations: ['createdBy'],
    })) as Plant;
  }

  private async plantingInit() {
    this.plantingRepository = this.module.get<Repository<Planting>>(getRepositoryToken(Planting));
    const planting = (await Calls.Planting.create(this.app, this.getAccessToken, {
      ...mockDto.plantingCreateDto,
      plantId: this.plant.id,
    })) as ObjectResponseType<Planting>;
    this.planting = (await this.plantingRepository.findOne({ where: { id: planting.body.id } })) as Planting;
  }

  private harvestEntryInit() {
    this.harvestEntryRepository = this.module.get<Repository<HarvestEntry>>(getRepositoryToken(HarvestEntry));
  }

  private async customerInit() {
    this.customerRepository = this.module.get<Repository<Customer>>(getRepositoryToken(Customer));
    const customer = (await Calls.Customer.create(this.app, this.accessToken)) as ObjectResponseType<Customer>;
    this.customer = (await this.customerRepository.findOne({ where: { id: customer.body.id } })) as Customer;
  }

  private orderInit() {
    this.orderRepository = this.module.get<Repository<Order>>(getRepositoryToken(Order));
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

  get getCustomer(): Customer {
    return this.customer;
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
