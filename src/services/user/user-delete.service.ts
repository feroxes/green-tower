import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../entities/farm.entity';
import { User } from '../../entities/user.entity';

import { UserComponent } from '../../components/user.component';

import { UserDeleteDto } from '../../api/dtos/user.dto';

import { userDeleteError } from '../../api/errors/user.errors';

import { OwnerTokenType } from '../../api/types/auth.types';

@Injectable()
export class UserDeleteService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    private userComponent: UserComponent,
  ) {}

  async delete(userDeleteDto: UserDeleteDto, ownerUser: OwnerTokenType): Promise<object> {
    const useCase = 'user/delete/';
    await this.userComponent.checkUserExistence(ownerUser.id, ownerUser.farmId, useCase);

    if (userDeleteDto.id === ownerUser.id) {
      throw userDeleteError.OwnerCouldNotBeDeleted();
    }

    const farm = await this.farmRepository.findOne({ where: { id: ownerUser.farmId } });

    if (!farm) {
      throw userDeleteError.FarmNotFound();
    }

    const user = await this.userComponent.checkUserExistence(userDeleteDto.id, ownerUser.farmId, useCase);

    await this.userRepository.remove(user);

    return {};
  }
}
