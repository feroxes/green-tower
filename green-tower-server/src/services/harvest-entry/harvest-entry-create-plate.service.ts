import { PlantingType } from '@entities/enums/planting-type.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HarvestEntry, HarvestEntryState } from '@entities/harvest-entry.entity';
import { Plant } from '@entities/plant.entity';
import { Planting, PlantingState } from '@entities/planting.entity';

import { FarmComponent } from '@components/farm.component';
import { PlantComponent } from '@components/plant.component';
import { PlantingComponent } from '@components/planting.component';
import { UserComponent } from '@components/user.component';

import { HarvestEntryCreatePlateDto } from '@dtos/harvest-entry.dto';

import { harvestEntryCreatePlateError } from '@errors/harverst-entry.errors';

import { ExecutorType } from '@app-types/auth.types';

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
    isInternalCall = false,
  ): Promise<HarvestEntry> {
    const useCase = 'harvestEntry/createPlate';
    const { plantingId, plantId, harvestGram, amountOfPlates } = harvestEntryCreatePlateDto;

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    const farm = await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    if (plantingId && !isInternalCall) {
      throw harvestEntryCreatePlateError.InvalidDto();
    }

    let planting: Planting | undefined;
    let plant: Plant | undefined;

    if (plantingId) {
      planting = await this.plantingComponent.checkPlantingExistence(
        { id: plantingId, farm: { id: executor.farmId } },
        useCase,
      );

      if (planting.state === PlantingState.HARVESTED) {
        throw harvestEntryCreatePlateError.PlantingIsNotInProperState({
          state: planting.state,
        });
      }

      plant = planting.plant;
    } else {
      plant = await this.plantComponent.checkPlantExistence(
        { id: plantId as string, farm: { id: executor.farmId } },
        useCase,
      );
    }

    const dto = {
      type: PlantingType.PLATE,
      state: HarvestEntryState.READY,
      farm,
      ...(planting && { planting }),
      plant,
      harvestGram,
      gramsDead: 0,
      isManualCreate: !planting,
      harvestAmountOfPlates: amountOfPlates,
      harvestAmountOfPlatesLeft: amountOfPlates,
      amountOfPlatesDead: 0,
    };

    if (harvestEntryCreatePlateDto.state === HarvestEntryState.DEAD) {
      dto.state = HarvestEntryState.DEAD;
      dto.harvestGram = 0;
      dto.gramsDead = harvestGram;
      dto.harvestAmountOfPlates = 0;
      dto.harvestAmountOfPlatesLeft = 0;
      dto.amountOfPlatesDead = amountOfPlates;
    }

    let harvestEntry = this.harvestEntryRepository.create(dto);

    try {
      harvestEntry = await this.harvestEntryRepository.save(harvestEntry);
    } catch (e: unknown) {
      throw harvestEntryCreatePlateError.FailedToCreateHarvestEntry({ e });
    }

    return harvestEntry;
  }
}
