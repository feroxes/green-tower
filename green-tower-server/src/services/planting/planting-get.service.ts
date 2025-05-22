import { Injectable } from '@nestjs/common';

import { Planting } from '../../entities/planting.entity';

import { FarmComponent } from '../../components/farm.component';
import { PlantingComponent } from '../../components/planting.component';
import { UserComponent } from '../../components/user.component';

import { PlantingGetDto } from '../../api/dtos/planting.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class PlantingUGetService {
  constructor(
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantingComponent: PlantingComponent,
  ) {}

  async get(plantingGetDto: PlantingGetDto, executor: ExecutorType): Promise<Planting> {
    const useCase = 'planting/get/';

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    return await this.plantingComponent.checkPlantingExistence(
      { id: plantingGetDto.id, farm: { id: executor.farmId } },
      useCase,
    );
  }
}
