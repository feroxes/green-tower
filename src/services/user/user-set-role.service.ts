import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Farm } from '../../entities/farm.entity';
import { UserSetRoleDto } from '../../api/dtos/user.dto';
import { userSetRoleError } from '../../api/errors/user.errors';
import { OwnerTokenType } from '../../api/types/auth.types';

@Injectable()
export class UserSetRoleService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
  ) {}

  async setRole(userSetRoleDto: UserSetRoleDto, ownerUser: OwnerTokenType): Promise<object> {
    const owner = await this.userRepository.findOne({ where: { id: ownerUser.id, farm: { id: ownerUser.farmId } } });

    if (!owner) {
      throw userSetRoleError.OwnerNotFound();
    }

    if (userSetRoleDto.id === ownerUser.id) {
      throw userSetRoleError.OwnerCouldNotBeUpdated();
    }

    const farm = await this.farmRepository.findOne({ where: { id: ownerUser.farmId } });

    if (!farm) {
      throw userSetRoleError.FarmNotFound();
    }

    const user = await this.userRepository.findOne({
      where: { id: userSetRoleDto.id, farm: { id: ownerUser.farmId } },
    });

    if (!user) {
      throw userSetRoleError.UserNotFound();
    }

    user.role = userSetRoleDto.role;

    return await this.userRepository.save(user);
  }
}
