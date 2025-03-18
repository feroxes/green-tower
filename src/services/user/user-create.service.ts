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
    const owner = await this.userRepository.findOne({ where: { id: ownerUser.id } });

    if (!owner) {
      throw userCreateError.OwnerNotFound();
    }

    const farm = await this.farmRepository.findOne({ where: { id: ownerUser.farmId }, relations: ['owner', 'users'] });

    if (!farm) {
      throw userCreateError.FarmNotFound();
    }

    if (owner.role !== UserRole.OWNER || farm.owner.id !== owner.id) {
      throw userCreateError.Forbidden();
    }

    const { user } = await this.userComponent.create(userCreateDto, 'user/create');
    user.farm = farm;

    await this.userRepository.save(user);

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }
}
