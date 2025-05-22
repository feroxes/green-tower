import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Planting } from '../entities/planting.entity';

import { PlantingComponentError } from '../api/errors/planting-component.errors';

@Injectable()
export class PlantingComponent {
  constructor(
    @InjectRepository(Planting)
    private plantingRepository: Repository<Planting>,
  ) {}

  async checkPlantingExistence(
    filter: { id: string; farm: { id: string } },
    errorCode: string,
    params?: object,
  ): Promise<Planting> {
    const Errors = new PlantingComponentError(errorCode);
    const planting = await this.plantingRepository.findOne({
      where: filter,
      relations: ['farm', 'createdBy', 'plant'],
      ...(params && { ...params }),
    });

    if (!planting) {
      throw Errors.PlantingNotFound();
    }
    return planting;
  }
}
