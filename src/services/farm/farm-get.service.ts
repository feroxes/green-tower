import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Farm } from '../../entities/farm.entity';
import { Repository } from 'typeorm';
import { FarmGetDto } from '../../dtos/farm.dto';
import { User, UserRole } from '../../entities/user.entity';

@Injectable()
export class FarmGetService {
  constructor(
    @InjectRepository(Farm)
    private farmRepo: Repository<Farm>,
  ) {}

  async get(
    farmGetDto: FarmGetDto,
    user: Partial<User>,
  ): Promise<Partial<Farm>> {
    const farm = await this.farmRepo.findOne({
      where: { id: farmGetDto.id },
      relations: ['owner'],
    });

    if (!farm) {
      throw new NotFoundException(`Farm not found`);
    }

    if (user.role !== UserRole.ADMIN || user.id !== farm.owner.id) {
      throw new ForbiddenException(
        `You do not have permission to access this farm`,
      );
    }

    return {
      id: farm.id,
      name: farm.name,
    };
  }
}
