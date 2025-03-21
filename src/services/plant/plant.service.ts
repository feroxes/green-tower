import { Injectable } from '@nestjs/common';
import { PlantCreateService } from './plant-create.service';
import { OwnerOrAdminTokenType } from '../../api/types/auth.types';
import { PlantCreateDto } from '../../api/dtos/plant.dto';

@Injectable()
export class PlantService {
  constructor(private plantCreateService: PlantCreateService) {}

  async create(plantCreateDto: PlantCreateDto, userToken: OwnerOrAdminTokenType) {
    return this.plantCreateService.create(plantCreateDto, userToken);
  }
}
