import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '@entities/farm.entity';

import { FarmGetComponentError } from '@errors/farm-component.errors';

@Injectable()
export class FarmComponent {
  constructor(
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
  ) {}

  async checkFarmExistence(id: string, errorCode: string, params?: object): Promise<Farm> {
    const Errors = new FarmGetComponentError(errorCode);
    const farm = await this.farmRepository.findOne({ where: { id }, ...(params && { ...params }) });

    if (!farm) {
      throw Errors.FarmNotFound();
    }
    return farm;
  }
}
