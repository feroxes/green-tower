import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Farm } from '../../entities/farm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FarmCreateService {
  constructor(
    @InjectRepository(Farm)
    private farmRepo: Repository<Farm>,
  ) {}

  async create(data: Partial<Farm>): Promise<Farm> {
    const farm = this.farmRepo.create(data);
    const savedFarm = await this.farmRepo.save(farm);
    return savedFarm;
  }
}
