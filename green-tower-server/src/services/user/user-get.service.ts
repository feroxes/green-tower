import { Injectable } from '@nestjs/common';

import { User, UserRole } from '../../entities/user.entity';

import { UserComponent } from '../../components/user.component';

import { UserGetDto } from '../../api/dtos/user.dto';

import { userGetError } from '../../api/errors/user.errors';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class UserGetService {
  constructor(private userComponent: UserComponent) {}

  async get(userGetDto: UserGetDto, executor: ExecutorType): Promise<User> {
    const useCase = 'user/get/';
    const _executor = await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    if (userGetDto?.id && userGetDto.id !== executor.id) {
      if (executor.role !== UserRole.OWNER) {
        throw userGetError.UserGetForbidden();
      }
    }

    if (!userGetDto?.id || userGetDto.id === executor.id) {
      return _executor;
    }

    return await this.userComponent.checkUserExistence(userGetDto?.id, executor.farmId, useCase);
  }
}
