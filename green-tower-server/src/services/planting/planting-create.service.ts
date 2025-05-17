import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Planting, PlantingState } from '../../entities/planting.entity';

import { FarmComponent } from '../../components/farm.component';
import { PlantComponent } from '../../components/plant.component';
import { UserComponent } from '../../components/user.component';

import { PlantingCreateDto } from '../../api/dtos/planting.dto';

import { plantingCreateError } from '../../api/errors/planting.errors';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class PlantingCreateService {
  constructor(
    @InjectRepository(Planting)
    private plantingRepository: Repository<Planting>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantComponent: PlantComponent,
  ) {}

  async create(plantingCreateDto: PlantingCreateDto, executor: ExecutorType): Promise<Planting> {
    const useCase = 'planting/create/';
    const user = await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    const farm = await this.farmComponent.checkFarmExistence(executor.farmId, useCase);
    const plant = await this.plantComponent.checkPlantExistence(
      { id: plantingCreateDto.plantId, farm: { id: executor.farmId } },
      useCase,
    );

    const _plantingCreateDto = {
      ...plantingCreateDto,
      state: PlantingState.GROWING,
      createdBy: user,
      farm,
      plant,
    };

    let planting: Planting;
    try {
      planting = await this.plantingRepository.save(_plantingCreateDto);
    } catch (e: unknown) {
      throw plantingCreateError.FailedToCreatePlanting({ e });
    }

    return planting;
  }
}
