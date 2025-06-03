import { PlantingType } from '@entities/enums/planting-type.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HarvestEntry, HarvestEntryState } from '@entities/harvest-entry.entity';

import { FarmComponent } from '@components/farm.component';
import { HarvestEntryComponent } from '@components/harvest-entry.component';
import { UserComponent } from '@components/user.component';

import { HarvestEntryCutPlateDto } from '@dtos/harvest-entry.dto';

import { harvestEntryCutPlateError } from '@errors/harverst-entry.errors';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class HarvestEntryCutPlateService {
  constructor(
    @InjectRepository(HarvestEntry)
    private readonly harvestEntryRepository: Repository<HarvestEntry>,
    private readonly userComponent: UserComponent,
    private readonly farmComponent: FarmComponent,
    private readonly harvestEntryComponent: HarvestEntryComponent,
  ) {}

  async cutPlate(harvestEntryCutPlateDto: HarvestEntryCutPlateDto, executor: ExecutorType): Promise<HarvestEntry> {
    const useCase = 'harvestEntry/cutPlate';
    const { harvestEntryId, amountOfPlates, amountOfGrams } = harvestEntryCutPlateDto;

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    const farm = await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    const harvestEntry = await this.harvestEntryComponent.checkHarvestEntryExistence(
      { id: harvestEntryId, farm: { id: executor.farmId } },
      useCase,
      { relations: ['planting', 'plant'] },
    );

    if (harvestEntry.type !== PlantingType.PLATE) {
      throw harvestEntryCutPlateError.InvalidHarvestEntryType();
    }

    if (harvestEntry.harvestAmountOfPlates! < amountOfPlates) {
      throw harvestEntryCutPlateError.NotEnoughPlates({
        available: harvestEntry.harvestAmountOfPlates,
        requested: amountOfPlates,
      });
    }

    let savedCutEntry: HarvestEntry;

    try {
      const dto = {
        type: PlantingType.CUT,
        state: HarvestEntryState.READY,
        farm,
        planting: harvestEntry.planting,
        plant: harvestEntry.plant,
        harvestGram: amountOfGrams,
        harvestGramsLeft: amountOfGrams,
        gramsDead: 0,
        isManualCreate: false,
      };

      savedCutEntry = await this.harvestEntryRepository.save(this.harvestEntryRepository.create(dto));

      harvestEntry.harvestAmountOfPlates! -= amountOfPlates;
      harvestEntry.harvestAmountOfPlatesLeft = harvestEntry.harvestAmountOfPlates;

      if (harvestEntry.harvestAmountOfPlates === 0) {
        await this.harvestEntryRepository.remove(harvestEntry);
      } else {
        await this.harvestEntryRepository.save(harvestEntry);
      }
    } catch (e: unknown) {
      throw harvestEntryCutPlateError.FailedToCutPlate({ e });
    }

    return savedCutEntry;
  }
}
