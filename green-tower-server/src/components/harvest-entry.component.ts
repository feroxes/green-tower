import { PlantingType } from '@entities/enums/planting-type.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { HarvestEntry, HarvestEntryState, HarvestEntryWithoutPlant } from '@entities/harvest-entry.entity';
import { OrderItemType } from '@entities/order-item.entity';

import { HarvestEntryComponentError } from '@errors/harvest-entry-component.errors';

@Injectable()
export class HarvestEntryComponent {
  constructor(
    @InjectRepository(HarvestEntry)
    private harvestEntryRepository: Repository<HarvestEntry>,
  ) {}

  async checkHarvestEntryExistence(
    filter: { id: string; farm: { id: string } },
    useCase: string,
    params?: object,
  ): Promise<HarvestEntry> {
    const Errors = new HarvestEntryComponentError(useCase);

    const harvestEntry = await this.harvestEntryRepository.findOne({
      where: filter,
      ...(params && { ...params }),
    });

    if (!harvestEntry) {
      throw Errors.HarvestEntryNotFound();
    }
    return harvestEntry;
  }

  async allocateStock(
    useCase: string,
    manager: EntityManager,
    entries: HarvestEntryWithoutPlant[],
    type: PlantingType,
    amountToAllocate: number,
  ): Promise<HarvestEntry[]> {
    const Errors = new HarvestEntryComponentError(useCase);
    const updatedEntries: HarvestEntry[] = [];

    for (const entry of entries) {
      if (amountToAllocate <= 0) break;

      const dbEntry = await manager.findOne(HarvestEntry, { where: { id: entry.id } });
      if (!dbEntry) continue;

      if (type === PlantingType.CUT) {
        const available = dbEntry.harvestGramsLeft ?? 0;
        const used = Math.min(available, amountToAllocate);
        dbEntry.harvestGramsLeft = available - used;
        if (dbEntry.harvestGramsLeft === 0) dbEntry.state = HarvestEntryState.SOLD;
        amountToAllocate -= used;
      } else {
        const available = dbEntry.harvestAmountOfPlatesLeft ?? 0;
        const used = Math.min(available, amountToAllocate);
        dbEntry.harvestAmountOfPlatesLeft = available - used;
        if (dbEntry.harvestAmountOfPlatesLeft === 0) dbEntry.state = HarvestEntryState.SOLD;
        amountToAllocate -= used;
      }

      updatedEntries.push(dbEntry);
    }

    if (amountToAllocate > 0) {
      throw Errors.NotEnoughStock();
    }

    return updatedEntries;
  }
}
