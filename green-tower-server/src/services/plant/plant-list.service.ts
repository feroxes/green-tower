import { Injectable } from '@nestjs/common';

import { Plant } from '@entities/plant.entity';

import { FarmComponent } from '@components/farm.component';
import { PlantComponent } from '@components/plant.component';
import { UserComponent } from '@components/user.component';

import { PlantListDto } from '@dtos/plant.dto';

import { ExecutorType } from '@app-types/auth.types';
import { ListResponseType } from '@app-types/dto.types';

@Injectable()
export class PlantListService {
  constructor(
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantComponent: PlantComponent,
  ) {}

  async list(plantListDto: PlantListDto, executor: ExecutorType): Promise<ListResponseType<Plant>> {
    const useCase = 'plant/list/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    return await this.plantComponent.list(executor, plantListDto.meta, plantListDto.filters, plantListDto.sorters);
  }
}
