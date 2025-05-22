import { Injectable } from '@nestjs/common';

import { Planting } from '../../entities/planting.entity';

import { FarmComponent } from '../../components/farm.component';
import { PlantingComponent } from '../../components/planting.component';
import { UserComponent } from '../../components/user.component';

import { PlantingListDto } from '../../api/dtos/planting.dto';

import { ExecutorType } from '../../api/types/auth.types';

import { ListResponseType } from '../../api/types/dto-types';

@Injectable()
export class PlantingListService {
  constructor(
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantingComponent: PlantingComponent,
  ) {}

  async list(plantingListDto: PlantingListDto, executor: ExecutorType): Promise<ListResponseType<Planting>> {
    const useCase = 'planting/list/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    return await this.plantingComponent.list(
      executor,
      plantingListDto.meta,
      plantingListDto.filters,
      plantingListDto.sorters,
    );
  }
}
