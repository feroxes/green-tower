import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HarvestEntry, HarvestEntryState } from '../../entities/harvest-entry.entity';
import { Plant } from '../../entities/plant.entity';
import { Planting, PlantingState } from '../../entities/planting.entity';

import { FarmComponent } from '../../components/farm.component';
import { PlantComponent } from '../../components/plant.component';
import { PlantingComponent } from '../../components/planting.component';
import { UserComponent } from '../../components/user.component';

import { HarvestEntryCreatePlateDto } from '../../api/dtos/harvest-entry.dto';

import { harvestEntryCreatePlateError } from '../../api/errors/harverst-entry.errors';

import { ExecutorType } from '../../api/types/auth.types';

import { PlantingType } from '../../entities/enums/planting-type.enum';

@Injectable()
export class HarvestEntryCreatePlateService {
  constructor(
    @InjectRepository(HarvestEntry)
    private readonly harvestEntryRepository: Repository<HarvestEntry>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private plantComponent: PlantComponent,
    private plantingComponent: PlantingComponent,
  ) {}

  async createPlate(
    harvestEntryCreatePlateDto: HarvestEntryCreatePlateDto,
    executor: ExecutorType,
  ): Promise<{ itemList: HarvestEntry[]; meta: { total: number } }> {
    const useCase = 'harvestEntry/createPlate';
    const { plantingId, plantId, harvestGram, amountOfPlates } = harvestEntryCreatePlateDto;

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    const farm = await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    let planting: Planting | undefined;
    let plant: Plant | undefined;

    if (plantingId) {
      planting = await this.plantingComponent.checkPlantingExistence(
        { id: plantingId, farm: { id: executor.farmId } },
        useCase,
      );
      if (planting.state !== PlantingState.HARVESTED) {
        throw harvestEntryCreatePlateError.PlantingIsNotInProperState({
          state: planting.state,
          expectedState: PlantingState.HARVESTED,
        });
      }
      plant = planting.plant;
    } else {
      plant = await this.plantComponent.checkPlantExistence(
        { id: plantId as string, farm: { id: executor.farmId } },
        useCase,
      );
    }

    const gramPerPlate = harvestGram / amountOfPlates;

    const dto = {
      type: PlantingType.PLATE,
      state: HarvestEntryState.READY,
      farm,
      ...(planting && { planting }),
      plant,
      harvestGram: gramPerPlate,
      isManualCreate: !planting,
      harvestGramsLeft: gramPerPlate,
      gramsDead: 0,
    };

    let harvestEntryList = Array.from({ length: amountOfPlates }).map(() => this.harvestEntryRepository.create(dto));

    try {
      harvestEntryList = await this.harvestEntryRepository.save(harvestEntryList);
    } catch (e: unknown) {
      throw harvestEntryCreatePlateError.FailedToCreateHarvestEntry({ e });
    }

    return { itemList: harvestEntryList, meta: { total: amountOfPlates } };
  }
}
