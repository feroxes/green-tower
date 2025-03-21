import { Injectable } from '@nestjs/common';

import { PlantCreateService } from './plant-create.service';

import { PlantCreateDto } from '../../api/dtos/plant.dto';

import { OwnerOrAdminTokenType } from '../../api/types/auth.types';

@Injectable()
export class PlantService {
  constructor(private plantCreateService: PlantCreateService) {}

  async create(plantCreateDto: PlantCreateDto, userToken: OwnerOrAdminTokenType) {
    return this.plantCreateService.create(plantCreateDto, userToken);
  }
}
