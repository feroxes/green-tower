import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../entities/farm.entity';
import { User } from '../../entities/user.entity';

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
  ) {}

  async delete(userDeleteDto: UserDeleteDto, ownerUser: OwnerTokenType): Promise<object> {
    const owner = await this.userRepository.findOne({ where: { id: ownerUser.id, farm: { id: ownerUser.farmId } } });

    if (!owner) {
      throw userDeleteError.OwnerNotFound();
    }

    if (userDeleteDto.id === ownerUser.id) {
      throw userDeleteError.OwnerCouldNotBeDeleted();
    }

    const farm = await this.farmRepository.findOne({ where: { id: ownerUser.farmId } });

    if (!farm) {
      throw userDeleteError.FarmNotFound();
    }

    const user = await this.userRepository.findOne({ where: { id: userDeleteDto.id, farm: { id: ownerUser.farmId } } });

    if (!user) {
      throw userDeleteError.UserNotFound();
    }

    await this.userRepository.remove(user);

    return {};
  }
}
