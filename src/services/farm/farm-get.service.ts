import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../entities/farm.entity';
import { User } from '../../entities/user.entity';

import { UserComponent } from '../../components/user.component';

import { FarmGetDto } from '../../api/dtos/farm.dto';

import { getError } from '../../api/errors/farm.errors';

import { OwnerTokenType } from '../../api/types/auth.types';

@Injectable()
export class FarmGetService {
  constructor(
    @InjectRepository(Farm)
    private farmRepo: Repository<Farm>,
    private userComponent: UserComponent,
  ) {}

  async get(farmGetDto: FarmGetDto, owner: OwnerTokenType): Promise<Farm> {
    const useCase = 'farm/get/';
    await this.userComponent.checkUserExistence(owner.id, owner.farmId, useCase);

    const farm = await this.farmRepo.findOne({
      where: { id: farmGetDto.id },
      relations: ['owner', 'users', 'plants'],
    });

    if (!farm) {
      throw getError.FarmNotFound();
    }

    if (owner.id !== farm.owner.id) {
      throw getError.Forbidden();
    }

    return farm;
  }
}
