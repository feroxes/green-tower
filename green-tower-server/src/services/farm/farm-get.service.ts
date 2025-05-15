import { Injectable } from '@nestjs/common';

import { Farm } from '../../entities/farm.entity';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

import { FarmGetDto } from '../../api/dtos/farm.dto';

import { getError } from '../../api/errors/farm.errors';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class FarmGetService {
  constructor(
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
  ) {}

  async get(farmGetDto: FarmGetDto, executor: ExecutorType): Promise<Farm> {
    const useCase = 'farm/get/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    const farm = await this.farmComponent.checkFarmExistence(farmGetDto.id, useCase, {
      relations: ['owner', 'users', 'plants'],
    });

    if (executor.id !== farm.owner.id) {
      throw getError.Forbidden();
    }

    return farm;
  }
}
