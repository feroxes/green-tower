import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entities/user.entity';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

import { UserDeleteDto } from '../../api/dtos/user.dto';

import { userDeleteError } from '../../api/errors/user.errors';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class UserDeleteService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
  ) {}

  async delete(userDeleteDto: UserDeleteDto, executor: ExecutorType): Promise<object> {
    const useCase = 'user/delete/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    if (userDeleteDto.id === executor.id) {
      throw userDeleteError.OwnerCouldNotBeDeleted();
    }

    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    const user = await this.userComponent.checkUserExistence(userDeleteDto.id, executor.farmId, useCase);

    await this.userRepository.remove(user);

    return {};
  }
}
