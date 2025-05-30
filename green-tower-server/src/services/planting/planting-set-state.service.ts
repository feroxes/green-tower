import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Planting, PlantingFinalStates, PlantingState } from '../../entities/planting.entity';

import { FarmComponent } from '../../components/farm.component';
import { PlantingComponent } from '../../components/planting.component';
import { UserComponent } from '../../components/user.component';

import { PlantingSetStateDto } from '../../api/dtos/planting.dto';

import { plantingSetStateError } from '../../api/errors/planting.errors';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class PlantingSetStateService {
  constructor(
    @InjectRepository(Planting)
    private plantingRepository: Repository<Planting>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantingComponent: PlantingComponent,
  ) {}

  async setState(plantingSetStateDto: PlantingSetStateDto, executor: ExecutorType): Promise<Planting> {
    const useCase = 'planting/setState/';

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    const planting = await this.plantingComponent.checkPlantingExistence(
      { id: plantingSetStateDto.id, farm: { id: executor.farmId } },
      useCase,
    );

    if (PlantingFinalStates.includes(planting.state)) {
      throw plantingSetStateError.PlantingIsInFinalState();
    }

    if (
      planting.state === PlantingState.READY &&
      plantingSetStateDto.state === PlantingState.GROWING &&
      new Date() > new Date(planting.expectedHarvestTs)
    ) {
      throw plantingSetStateError.CannotSetGrowingState();
    }

    planting.state = plantingSetStateDto.state;

    if (planting.state === PlantingState.DEAD) {
      planting.deadTs = new Date();
    }

    try {
      return await this.plantingRepository.save(planting);
    } catch (e: unknown) {
      throw plantingSetStateError.FailedToSetPlantingState({ e });
    }
  }
}
