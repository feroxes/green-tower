import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plant } from '../../entities/plant.entity';

import { FarmComponent } from '../../components/farm.component';
import { PlantComponent } from '../../components/plant.component';
import { UserComponent } from '../../components/user.component';

import { PlantUpdateDto } from '../../api/dtos/plant.dto';

import { plantUpdateError } from '../../api/errors/plant.errors';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class PlantUpdateService {
  constructor(
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantComponent: PlantComponent,
  ) {}

  async update(plantUpdateDto: PlantUpdateDto, executor: ExecutorType): Promise<Plant> {
    const useCase = 'plant/update/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    let plant = await this.plantComponent.checkPlantExistence(
      { id: plantUpdateDto.id, farm: { id: executor.farmId } },
      useCase,
    );

    const _plantUpdateDto = {
      ...plant,
      ...plantUpdateDto,
    };

    try {
      plant = await this.plantRepository.save(_plantUpdateDto);
    } catch (e: unknown) {
      throw plantUpdateError.FailedToUpdatePlant({ e });
    }
    return plant;
  }
}
