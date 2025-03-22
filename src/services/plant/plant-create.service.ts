import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plant } from '../../entities/plant.entity';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

import { PlantCreateDto } from '../../api/dtos/plant.dto';

import { OwnerOrAdminTokenType } from '../../api/types/auth.types';

@Injectable()
export class PlantCreateService {
  constructor(
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
  ) {}

  async create(plantCreateDto: PlantCreateDto, userToken: OwnerOrAdminTokenType): Promise<Plant> {
    const useCase = 'plant/create/';
    const user = await this.userComponent.checkUserExistence(userToken.id, userToken.farmId, useCase);

    const farm = await this.farmComponent.checkFarmExistence(userToken.farmId, useCase);

    const _plantCreateDto = {
      ...plantCreateDto,
      createdBy: user,
      farm,
    };

    const plant = this.plantRepository.create(_plantCreateDto);

    return await this.plantRepository.save(plant);
  }
}
