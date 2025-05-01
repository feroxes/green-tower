import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserRole } from '../../entities/user.entity';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

import { UserUpdateDto } from '../../api/dtos/user.dto';

import { userUpdateError } from '../../api/errors/user.errors';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class UserUpdateService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
  ) {}

  async update(userUpdateDto: UserUpdateDto, executor: ExecutorType): Promise<User> {
    const useCase = 'user/update/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    let user = await this.userComponent.checkUserExistence(userUpdateDto.id, executor.farmId, useCase);

    if (user.id !== executor.id) {
      if (executor.role !== UserRole.OWNER && executor.role !== UserRole.ADMIN) {
        throw userUpdateError.UserUpdateForbidden();
      }
    }

    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    try {
      user = await this.userRepository.save(this.userRepository.create({ ...user, ...userUpdateDto }));
      return user;
    } catch (e: unknown) {
      throw userUpdateError.FailedToUpdateUser({ e });
    }
  }
}
