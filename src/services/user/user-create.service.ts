import { Injectable } from '@nestjs/common';

import { User } from '../../entities/user.entity';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

import { UserCreateCmdDto } from '../../api/dtos/user.dto';

import { OwnerTokenType } from '../../api/types/auth.types';

@Injectable()
export class UserCreateService {
  constructor(
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
  ) {}

  async create(userCreateDto: UserCreateCmdDto, ownerUser: OwnerTokenType): Promise<User> {
    const useCase = 'user/create/';
    await this.userComponent.checkUserExistence(ownerUser.id, ownerUser.farmId, useCase);

    const farm = await this.farmComponent.checkFarmExistence(ownerUser.farmId, useCase);

    const { user } = await this.userComponent.create(userCreateDto, farm, useCase);

    return user;
  }
}
