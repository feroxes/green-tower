import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Farm } from '../entities/farm.entity';
import { Plant } from '../entities/plant.entity';
import { User } from '../entities/user.entity';

import { TokenService } from '../services/token/token.service';

import { PlantListFiltersDto, PlantListSortersDto } from '../api/dtos/plant.dto';
import { UserCreateDto } from '../api/dtos/user.dto';

import { UserCheckExistenceComponentError, UserCreateComponentError } from '../api/errors/user-component.errors';

import { ExecutorType } from '../api/types/auth.types';
import { SortDirectionType } from '../api/types/common.types';

import { ListMetaDto, ListResponseType } from '../api/types/dto-types';
import { List } from '../decorators/list.decorator';
import { AuthConstants } from '../utils/constants';

@Injectable()
export class UserComponent {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  async create(createDto: UserCreateDto, farm: Farm, errorCode: string): Promise<{ user: User }> {
    const Errors = new UserCreateComponentError(errorCode);
    const existingUser = await this.userRepository.findOne({
      where: { email: createDto.email },
    });

    if (existingUser) {
      throw Errors.UserAlreadyExists();
    }

    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    let user = this.userRepository.create({
      ...createDto,
      password: hashedPassword,
    });

    user.farm = farm;
    const confirmationToken = this.tokenService.generateEmailConfirmationToken();

    const emailConfirmationExpires = new Date();
    emailConfirmationExpires.setHours(
      emailConfirmationExpires.getHours() + AuthConstants.EMAIL_CONFIRMATION_EXPIRES_HOURS,
    );

    user.emailConfirmationToken = confirmationToken;
    user.emailConfirmationExpires = emailConfirmationExpires;
    user.isEmailConfirmed = false;

    try {
      user = await this.userRepository.save(user);
    } catch (e: unknown) {
      throw Errors.FailedToCreateUser({ e });
    }

    return { user };
  }

  @List({
    entity: User,
    relations: ['farm', 'plants'],
    defaultSort: { field: 'createdAt', order: SortDirectionType.DESC },
  })
  async list(executor: ExecutorType, meta?: ListMetaDto): Promise<ListResponseType<User>> {
    return Promise.resolve({ itemList: [], meta: { page: 0, size: 0, total: 0 } });
  }

  async checkUserExistence(id: string, farmId: string, errorCode: string): Promise<User> {
    const Errors = new UserCheckExistenceComponentError(errorCode);
    const user = await this.userRepository.findOne({ where: { id, farm: { id: farmId } } });

    if (!user) {
      throw Errors.UserNotFound({ id });
    }
    return user;
  }
}
