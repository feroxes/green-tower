import { Injectable } from '@nestjs/common';

import { PlantCreateService } from './plant-create.service';
import { PlantDeleteService } from './plant-delete.service';
import { PlantGetService } from './plant-get.service';
import { PlantUpdateService } from './plant-update.service';

import { PlantCreateDto, PlantDeleteDto, PlantGetDto, PlantUpdateDto } from '../../api/dtos/plant.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class PlantService {
  constructor(
    private plantCreateService: PlantCreateService,
    private plantUpdateService: PlantUpdateService,
    private plantGetService: PlantGetService,
    private plantDeleteService: PlantDeleteService,
  ) {}

  async create(plantCreateDto: PlantCreateDto, executor: ExecutorType) {
    return this.plantCreateService.create(plantCreateDto, executor);
  }

  async update(plantUpdateDto: PlantUpdateDto, executor: ExecutorType) {
    return this.plantUpdateService.update(plantUpdateDto, executor);
  }

  async get(plantGetDto: PlantGetDto, executor: ExecutorType) {
    return this.plantGetService.get(plantGetDto, executor);
  }

  async delete(plantDeleteDto: PlantDeleteDto, executor: ExecutorType) {
    return this.plantDeleteService.delete(plantDeleteDto, executor);
  }
}
