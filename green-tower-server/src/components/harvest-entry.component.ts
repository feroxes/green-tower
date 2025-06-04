import { PlantingType } from '@entities/enums/planting-type.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { HarvestEntry, HarvestEntryState, HarvestEntryWithoutPlant } from '@entities/harvest-entry.entity';
import { OrderItem } from '@entities/order-item.entity';
import { OrderItemHarvestEntry } from '@entities/order-item-harvest-entry.entity';

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
    orderItem: OrderItem,
    entries: HarvestEntryWithoutPlant[],
    type: PlantingType,
    amountToAllocate: number,
  ): Promise<HarvestEntry[]> {
    const Errors = new HarvestEntryComponentError(useCase);
    const updatedEntries: HarvestEntry[] = [];

    for (const entry of entries) {
      if (amountToAllocate <= 0) break;

      const harvestEntry = await manager.findOne(HarvestEntry, { where: { id: entry.id } });
      if (!harvestEntry) continue;

      let available = 0;
      let amountTaken = 0;

      if (type === PlantingType.CUT) {
        available = harvestEntry.harvestGramsLeft ?? 0;
        amountTaken = Math.min(available, amountToAllocate);
        harvestEntry.harvestGramsLeft = available - amountTaken;
      } else {
        available = harvestEntry.harvestAmountOfPlatesLeft ?? 0;
        amountTaken = Math.min(available, amountToAllocate);
        harvestEntry.harvestAmountOfPlatesLeft = available - amountTaken;
      }

      if (
        (type === PlantingType.CUT && harvestEntry.harvestGramsLeft === 0) ||
        (type === PlantingType.PLATE && harvestEntry.harvestAmountOfPlatesLeft === 0)
      ) {
        harvestEntry.state = HarvestEntryState.SOLD;
      }

      amountToAllocate -= amountTaken;
      updatedEntries.push(harvestEntry);

      const relation = manager.create(OrderItemHarvestEntry, { orderItem, harvestEntry, amountTaken });

      try {
        await manager.save(OrderItemHarvestEntry, relation);
      } catch (e: unknown) {
        throw Errors.FailedToCreateOrderItemHarvestEntry({ e });
      }
    }

    if (amountToAllocate > 0) {
      throw Errors.NotEnoughStock();
    }

    try {
      await manager.save(HarvestEntry, updatedEntries);
    } catch (e: unknown) {
      throw Errors.FailedToCreateHarvestEntry({ e });
    }

    return updatedEntries;
  }
}
