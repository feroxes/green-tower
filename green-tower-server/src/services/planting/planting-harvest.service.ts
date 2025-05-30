import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Planting, PlantingFinalStates, PlantingState } from '../../entities/planting.entity';

import { HarvestEntryService } from '../harvest-entry/harvest-entry.service';

import { FarmComponent } from '../../components/farm.component';
import { PlantingComponent } from '../../components/planting.component';
import { UserComponent } from '../../components/user.component';

import { PlantingHarvestDto } from '../../api/dtos/planting.dto';

import { plantingHarvestError } from '../../api/errors/planting.errors';

import { ExecutorType } from '../../api/types/auth.types';

import { PlantingType } from '../../entities/enums/planting-type.enum';

@Injectable()
export class PlantingHarvestService {
  constructor(
    @InjectRepository(Planting)
    private plantingRepository: Repository<Planting>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantingComponent: PlantingComponent,
    private harvestEntryService: HarvestEntryService,
  ) {}

  async harvest(plantingHarvestDto: PlantingHarvestDto, executor: ExecutorType): Promise<Planting> {
    const useCase = 'planting/harvest/';

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    let planting = await this.plantingComponent.checkPlantingExistence(
      { id: plantingHarvestDto.id, farm: { id: executor.farmId } },
      useCase,
    );

    if (PlantingFinalStates.includes(planting.state)) {
      throw plantingHarvestError.PlantingIsInFinalState();
    }

    const harvestEntryDto = {
      plantingId: planting.id,
      type: plantingHarvestDto.type,
      harvestGram: plantingHarvestDto.harvestGram,
    };

    try {
      if (harvestEntryDto.type === PlantingType.PLATE) {
        await this.harvestEntryService.createPlate(
          { ...harvestEntryDto, amountOfPlates: plantingHarvestDto.amountOfPlates! },
          executor,
          true,
        );
      } else {
        await this.harvestEntryService.createCut(harvestEntryDto, executor, true);
      }
    } catch (e: unknown) {
      throw plantingHarvestError.FailedToCreateHarvestEntry({ e });
    }

    planting.state = PlantingState.HARVESTED;
    planting.harvestTs = new Date();

    try {
      planting = await this.plantingRepository.save(planting);
    } catch (e: unknown) {
      //TODO - DELETE HARVEST ENTRY
      throw plantingHarvestError.FailedToSetPlantingState({ e });
    }

    return planting;
  }
}
