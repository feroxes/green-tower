import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farm } from '../../entities/farm.entity';
import { Plant } from '../../entities/plant.entity';
import { User } from '../../entities/user.entity';

import { UserComponent } from '../../components/user.component';

import { PlantCreateDto } from '../../api/dtos/plant.dto';

import { plantCreateError } from '../../api/errors/plant.errors';

import { OwnerOrAdminTokenType } from '../../api/types/auth.types';

@Injectable()
export class PlantCreateService {
  constructor(
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>,
    private userComponent: UserComponent,
  ) {}

  async create(plantCreateDto: PlantCreateDto, userToken: OwnerOrAdminTokenType): Promise<Plant> {
    const useCase = 'plant/create/';
    const user = await this.userComponent.checkUserExistence(userToken.id, userToken.farmId, useCase);

    const farm = await this.farmRepository.findOne({ where: { id: userToken.farmId } });

    if (!farm) {
      throw plantCreateError.FarmNotFound();
    }

    const _plantCreateDto = {
      ...plantCreateDto,
      createdBy: user,
      farm,
    };

    const plant = this.plantRepository.create(_plantCreateDto);

    return await this.plantRepository.save(plant);
  }
}
