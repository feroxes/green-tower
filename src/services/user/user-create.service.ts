import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Farm } from '../../entities/farm.entity';
import { UserCreateCmdDto } from '../../api/dtos/user.dto';
import { UserRole } from '../../entities/user.entity';
import { userCreateError } from '../../api/errors/user.errors';
import { UserComponent } from '../../components/user.component';
import { OwnerTokenType } from '../../api/types/auth.types';

@Injectable()
export class UserCreateService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    private userComponent: UserComponent,
  ) {}

  async create(userCreateDto: UserCreateCmdDto, ownerUser: OwnerTokenType): Promise<Partial<User>> {
    const owner = await this.userRepository.findOne({ where: { id: ownerUser.id, farm: { id: ownerUser.farmId } } });

    if (!owner) {
      throw userCreateError.OwnerNotFound();
    }

    const farm = await this.farmRepository.findOne({ where: { id: ownerUser.farmId } });

    if (!farm) {
      throw userCreateError.FarmNotFound();
    }

    if (owner.role !== UserRole.OWNER) {
      throw userCreateError.Forbidden();
    }

    const { user } = await this.userComponent.create(userCreateDto, farm, 'user/create');

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }
}
