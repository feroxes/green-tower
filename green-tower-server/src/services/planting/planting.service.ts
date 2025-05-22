import { Injectable } from '@nestjs/common';

import { PlantingCreateService } from './planting-create.service';
import { PlantingUpdateService } from './planting-update.service';

import { PlantingCreateDto, PlantingUpdateDto } from '../../api/dtos/planting.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class PlantingService {
  constructor(
    private plantingCreateService: PlantingCreateService,
    private plantingUpdateService: PlantingUpdateService,
  ) {}

  async create(plantingCreateDto: PlantingCreateDto, executor: ExecutorType) {
    return this.plantingCreateService.create(plantingCreateDto, executor);
  }

  async update(plantingUpdateDto: PlantingUpdateDto, executor: ExecutorType) {
    return this.plantingUpdateService.update(plantingUpdateDto, executor);
  }
}
