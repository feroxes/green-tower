import { Injectable } from '@nestjs/common';

import { PlantCreateService } from './plant-create.service';
import { PlantUpdateService } from './plant-update.service';

import { PlantCreateDto, PlantUpdateDto } from '../../api/dtos/plant.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class PlantService {
  constructor(
    private plantCreateService: PlantCreateService,
    private plantUpdateService: PlantUpdateService,
  ) {}

  async create(plantCreateDto: PlantCreateDto, executor: ExecutorType) {
    return this.plantCreateService.create(plantCreateDto, executor);
  }

  async update(plantUpdateDto: PlantUpdateDto, executor: ExecutorType) {
    return this.plantUpdateService.update(plantUpdateDto, executor);
  }
}
