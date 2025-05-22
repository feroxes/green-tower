import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Planting } from '../../entities/planting.entity';

import { FarmComponent } from '../../components/farm.component';
import { PlantingComponent } from '../../components/planting.component';
import { UserComponent } from '../../components/user.component';

import { PlantingDeleteDto } from '../../api/dtos/planting.dto';

import { plantingDeleteError } from '../../api/errors/planting.errors';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class PlantingDeleteService {
  constructor(
    @InjectRepository(Planting)
    private plantingRepository: Repository<Planting>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantingComponent: PlantingComponent,
  ) {}

  async delete(plantingDeleteDto: PlantingDeleteDto, executor: ExecutorType): Promise<void> {
    const useCase = 'planting/delete/';

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);
    await this.plantingComponent.checkPlantingExistence(
      { id: plantingDeleteDto.id, farm: { id: executor.farmId } },
      useCase,
    );

    try {
      await this.plantingRepository.delete(plantingDeleteDto.id);
    } catch (e: unknown) {
      throw plantingDeleteError.FailedToDeletePlanting({ e });
    }
  }
}
