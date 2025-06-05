import { PlantingType } from '@entities/enums/planting-type.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { HarvestEntry, HarvestEntryState, HarvestEntryWithoutPlant } from '@entities/harvest-entry.entity';
import { Plant } from '@entities/plant.entity';

import { FarmComponent } from '@components/farm.component';
import { UserComponent } from '@components/user.component';

import { ExecutorType } from '@app-types/auth.types';
import { ListResponseType } from '@app-types/dto.types';

export type HarvestGroup = {
  plant: Plant;
  cut: {
    totalGrams: number;
    totalGramsLeft: number;
    entries: HarvestEntryWithoutPlant[];
  };
  plate: {
    totalPlates: number;
    totalPlatesLeft: number;
    entries: HarvestEntryWithoutPlant[];
  };
};

@Injectable()
export class HarvestEntryListGroupedService {
  constructor(
    @InjectRepository(HarvestEntry)
    private readonly harvestEntryRepository: Repository<HarvestEntry>,
    private readonly userComponent: UserComponent,
    private readonly farmComponent: FarmComponent,
  ) {}

  async listGroupedByPlant(executor: ExecutorType): Promise<ListResponseType<HarvestGroup>> {
    const useCase = 'harvestEntry/listGroupedByPlant';

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    const harvestEntries = await this.harvestEntryRepository.find({
      where: {
        farm: { id: executor.farmId },
        state: HarvestEntryState.READY,
      },
      relations: ['plant'],
      order: { createdAt: 'ASC' },
    });

    return this.groupByPlant(harvestEntries);
  }

  async listGroupedByPlantTransactional(executor: ExecutorType, manager: EntityManager) {
    const harvestEntries = await manager.find(HarvestEntry, {
      where: { farm: { id: executor.farmId }, state: HarvestEntryState.READY },
      relations: ['plant'],
      order: { createdAt: 'ASC' },
    });

    return this.groupByPlant(harvestEntries);
  }

  private groupByPlant(harvestEntries: HarvestEntry[]) {
    const groupedByPlant = harvestEntries.reduce(
      (acc, entry) => {
        const plantId = entry.plant.id;
        if (!acc[plantId]) {
          acc[plantId] = {
            plant: entry.plant,
            cut: {
              totalGrams: 0,
              totalGramsLeft: 0,
              entries: [],
            },
            plate: {
              totalPlates: 0,
              totalPlatesLeft: 0,
              entries: [],
            },
          };
        }

        const { plant, ...entryWithoutPlant } = entry;

        if (entry.type === PlantingType.CUT) {
          acc[plantId].cut.totalGrams += entry.harvestGram;
          acc[plantId].cut.totalGramsLeft += entry.harvestGramsLeft || 0;
          acc[plantId].cut.entries.push(entryWithoutPlant);
        } else {
          acc[plantId].plate.totalPlates += entry.harvestAmountOfPlates || 0;
          acc[plantId].plate.totalPlatesLeft += entry.harvestAmountOfPlatesLeft || 0;
          acc[plantId].plate.entries.push(entryWithoutPlant);
        }

        return acc;
      },
      {} as Record<string, HarvestGroup>,
    );

    const itemList = Object.values(groupedByPlant);

    return { itemList, meta: { page: 0, size: itemList.length, total: itemList.length } };
  }
}
