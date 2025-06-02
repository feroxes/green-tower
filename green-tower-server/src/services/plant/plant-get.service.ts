import { Injectable } from '@nestjs/common';

import { Plant } from '@entities/plant.entity';

import { FarmComponent } from '@components/farm.component';
import { PlantComponent } from '@components/plant.component';
import { UserComponent } from '@components/user.component';

import { PlantGetDto } from '@dtos/plant.dto';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class PlantGetService {
  constructor(
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantComponent: PlantComponent,
  ) {}

  async get(plantGetDto: PlantGetDto, executor: ExecutorType): Promise<Plant> {
    const useCase = 'plant/get/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    return await this.plantComponent.checkPlantExistence(
      { id: plantGetDto.id, farm: { id: executor.farmId } },
      useCase,
    );
  }
}
