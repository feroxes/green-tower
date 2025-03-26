import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entities/user.entity';

import { UserComponent } from '../../components/user.component';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class UserListService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userComponent: UserComponent,
  ) {}

  async list(executor: ExecutorType): Promise<User[]> {
    const useCase = 'user/list/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    return this.userRepository.find({ where: { farm: { id: executor.farmId } } });
  }
}
