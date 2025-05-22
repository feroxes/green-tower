import { Injectable } from '@nestjs/common';

import { PlantingCreateService } from './planting-create.service';
import { PlantingDeleteService } from './planting-delete.service';
import { PlantingUGetService } from './planting-get.service';
import { PlantingUpdateService } from './planting-update.service';
import { PlantingListService } from './planting-list.service';

import { PlantingCreateDto, PlantingDeleteDto, PlantingGetDto, PlantingUpdateDto, PlantingListDto } from '../../api/dtos/planting.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class PlantingService {
  constructor(
    private plantingCreateService: PlantingCreateService,
    private plantingUpdateService: PlantingUpdateService,
    private plantingGetService: PlantingUGetService,
    private plantingDeleteService: PlantingDeleteService,
    private plantingListService: PlantingListService,
  ) {}

  async create(plantingCreateDto: PlantingCreateDto, executor: ExecutorType) {
    return this.plantingCreateService.create(plantingCreateDto, executor);
  }

  async update(plantingUpdateDto: PlantingUpdateDto, executor: ExecutorType) {
    return this.plantingUpdateService.update(plantingUpdateDto, executor);
  }

  async get(plantingGetDto: PlantingGetDto, executor: ExecutorType) {
    return this.plantingGetService.get(plantingGetDto, executor);
  }

  async delete(plantingDeleteDto: PlantingDeleteDto, executor: ExecutorType) {
    return this.plantingDeleteService.delete(plantingDeleteDto, executor);
  }

  async list(plantingListDto: PlantingListDto, executor: ExecutorType) {
    return this.plantingListService.list(plantingListDto, executor);
  }
}
