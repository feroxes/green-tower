import { Injectable } from '@nestjs/common';

import { PlantCreateService } from './plant-create.service';

import { PlantCreateDto } from '../../api/dtos/plant.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class PlantService {
  constructor(private plantCreateService: PlantCreateService) {}

  async create(plantCreateDto: PlantCreateDto, executor: ExecutorType) {
    return this.plantCreateService.create(plantCreateDto, executor);
  }
}
