import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getError } from '../../api/errors/farm.errors';
import { Farm } from '../../entities/farm.entity';
import { Repository } from 'typeorm';
import { FarmGetDto } from '../../api/dtos/farm.dto';
import { User, UserRole } from '../../entities/user.entity';

@Injectable()
export class FarmGetService {
  constructor(
    @InjectRepository(Farm)
    private farmRepo: Repository<Farm>,
  ) {}

  async get(farmGetDto: FarmGetDto, user: Partial<User>): Promise<Farm> {
    const farm = await this.farmRepo.findOne({
      where: { id: farmGetDto.id },
      relations: ['owner', 'users'],
    });

    if (!farm) {
      throw getError.FarmNotFound();
    }

    if (user.role !== UserRole.OWNER || user.id !== farm.owner.id) {
      throw getError.Forbidden();
    }

    return farm;
  }
}
