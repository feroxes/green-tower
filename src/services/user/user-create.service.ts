import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../entities/farm.entity';
import { User } from '../../entities/user.entity';

import { UserComponent } from '../../components/user.component';

import { UserCreateCmdDto } from '../../api/dtos/user.dto';

import { userCreateError } from '../../api/errors/user.errors';

import { OwnerTokenType } from '../../api/types/auth.types';

@Injectable()
export class UserCreateService {
  constructor(
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    private userComponent: UserComponent,
  ) {}

  async create(userCreateDto: UserCreateCmdDto, ownerUser: OwnerTokenType): Promise<User> {
    const useCase = 'user/create/';
    await this.userComponent.checkUserExistence(ownerUser.id, ownerUser.farmId, useCase);

    const farm = await this.farmRepository.findOne({ where: { id: ownerUser.farmId } });

    if (!farm) {
      throw userCreateError.FarmNotFound();
    }

    const { user } = await this.userComponent.create(userCreateDto, farm, useCase);

    return user;
  }
}
