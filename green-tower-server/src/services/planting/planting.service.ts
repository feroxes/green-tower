import { Injectable } from '@nestjs/common';

import { PlantingCreateService } from './planting-create.service';

import { PlantingCreateDto } from '../../api/dtos/planting.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class PlantingService {
  constructor(private plantingCreateService: PlantingCreateService) {}

  async create(plantingCreateDto: PlantingCreateDto, executor: ExecutorType) {
    return this.plantingCreateService.create(plantingCreateDto, executor);
  }
}
