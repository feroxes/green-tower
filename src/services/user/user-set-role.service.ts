import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entities/user.entity';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

import { UserSetRoleDto } from '../../api/dtos/user.dto';

import { userSetRoleError } from '../../api/errors/user.errors';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class UserSetRoleService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
  ) {}

  async setRole(userSetRoleDto: UserSetRoleDto, executor: ExecutorType): Promise<object> {
    const useCase = 'user/setRole/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    if (userSetRoleDto.id === executor.id) {
      throw userSetRoleError.OwnerCouldNotBeUpdated();
    }

    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    const user = await this.userComponent.checkUserExistence(userSetRoleDto.id, executor.farmId, useCase);

    user.role = userSetRoleDto.role;

    return await this.userRepository.save(user);
  }
}
