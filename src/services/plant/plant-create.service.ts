import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plant } from '../../entities/plant.entity';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

import { PlantCreateDto } from '../../api/dtos/plant.dto';

import { plantCreateError } from '../../api/errors/plant.errors';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class PlantCreateService {
  constructor(
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
  ) {}

  async create(plantCreateDto: PlantCreateDto, executor: ExecutorType): Promise<Plant> {
    const useCase = 'plant/create/';
    const user = await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    const farm = await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    const _plantCreateDto = {
      ...plantCreateDto,
      createdBy: user,
      farm,
    };

    let plant = this.plantRepository.create(_plantCreateDto);

    try {
      plant = await this.plantRepository.save(plant);
    } catch (e: unknown) {
      throw plantCreateError.FailedToCreatePlant({ e });
    }
    return plant;
  }
}
