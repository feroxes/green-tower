import { Injectable } from '@nestjs/common';

import { User } from '@entities/user.entity';

import { UserComponent } from '@components/user.component';

import { ExecutorType } from '@app-types/auth.types';
import { ListResponseType } from '@app-types/dto.types';

@Injectable()
export class UserListService {
  constructor(private userComponent: UserComponent) {}

  async list(executor: ExecutorType): Promise<ListResponseType<User>> {
    const useCase = 'user/list/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    return this.userComponent.list(executor);
  }
}
