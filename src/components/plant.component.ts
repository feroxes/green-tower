import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plant } from '../entities/plant.entity';

import { PlantComponentError } from '../api/errors/plant-component.errors';

@Injectable()
export class PlantComponent {
  constructor(
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>,
  ) {}

  async checkPlantExistence(
    filter: { id: string; farm: { id: string } },
    errorCode: string,
    params?: object,
  ): Promise<Plant> {
    const Errors = new PlantComponentError(errorCode);
    const plant = await this.plantRepository.findOne({
      where: filter,
      relations: ['farm', 'createdBy'],
      ...(params && { ...params }),
    });

    if (!plant) {
      throw Errors.PlantNotFound();
    }
    return plant;
  }
}
