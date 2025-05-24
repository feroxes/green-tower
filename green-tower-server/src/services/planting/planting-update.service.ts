import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Planting } from '../../entities/planting.entity';

import { FarmComponent } from '../../components/farm.component';
import { PlantComponent } from '../../components/plant.component';
import { PlantingComponent } from '../../components/planting.component';
import { UserComponent } from '../../components/user.component';

import { PlantingUpdateDto } from '../../api/dtos/planting.dto';

import { plantingUpdateError } from '../../api/errors/planting.errors';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class PlantingUpdateService {
  constructor(
    @InjectRepository(Planting)
    private plantingRepository: Repository<Planting>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantComponent: PlantComponent,
    private plantingComponent: PlantingComponent,
  ) {}

  async update(plantingUpdateDto: PlantingUpdateDto, executor: ExecutorType): Promise<Planting> {
    const useCase = 'planting/update/';

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    let planting = await this.plantingComponent.checkPlantingExistence(
      { id: plantingUpdateDto.id, farm: { id: executor.farmId } },
      useCase,
    );

    const plant = await this.plantComponent.checkPlantExistence(
      { id: plantingUpdateDto.plantId || planting.plant.id, farm: { id: executor.farmId } },
      useCase,
    );

    const updateData = { ...planting, ...plantingUpdateDto, plant };

    if (plantingUpdateDto.plantId) {
      const harvestTs = new Date();
      harvestTs.setHours(harvestTs.getHours() + plant.expectedHoursToHarvest);
      updateData.harvestTs = harvestTs;
    }

    try {
      planting = await this.plantingRepository.save(this.plantingRepository.create(updateData));
    } catch (e: unknown) {
      throw plantingUpdateError.FailedToUpdatePlanting({ e });
    }
    return planting;
  }
}
