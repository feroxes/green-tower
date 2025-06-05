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

  async allocateHarvestEntry(
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
      const isCut = type === PlantingType.CUT;
      const isPlate = type === PlantingType.PLATE;

      if (isCut) {
        available = harvestEntry.harvestGramsLeft ?? 0;
        amountTaken = Math.min(available, amountToAllocate);
        harvestEntry.harvestGramsLeft = available - amountTaken;
      } else {
        available = harvestEntry.harvestAmountOfPlatesLeft ?? 0;
        amountTaken = Math.min(available, amountToAllocate);
        harvestEntry.harvestAmountOfPlatesLeft = available - amountTaken;
      }

      if ((isCut && harvestEntry.harvestGramsLeft === 0) || (isPlate && harvestEntry.harvestAmountOfPlatesLeft === 0)) {
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

  async rollbackHarvestEntry(useCase: string, manager: EntityManager, orderItem: OrderItem): Promise<void> {
    const Errors = new HarvestEntryComponentError(useCase);

    const relations = await manager.find(OrderItemHarvestEntry, {
      where: { orderItem: { id: orderItem.id } },
      relations: ['harvestEntry'],
    });

    const updatedEntries: HarvestEntry[] = [];

    for (const relation of relations) {
      const entry = relation.harvestEntry;
      if (!entry) continue;

      if (orderItem.type === PlantingType.CUT) {
        entry.harvestGramsLeft = (entry.harvestGramsLeft ?? 0) + relation.amountTaken;
      } else {
        entry.harvestAmountOfPlatesLeft = (entry.harvestAmountOfPlatesLeft ?? 0) + relation.amountTaken;
      }

      const hasStock = (entry.harvestGramsLeft ?? 0) > 0 || (entry.harvestAmountOfPlatesLeft ?? 0) > 0;
      if (hasStock && entry.state === HarvestEntryState.SOLD) {
        entry.state = HarvestEntryState.READY;
      }

      updatedEntries.push(entry);
    }

    try {
      if (updatedEntries.length > 0) {
        await manager.save(HarvestEntry, updatedEntries);
      }
      await manager.remove(OrderItemHarvestEntry, relations);
    } catch (e: unknown) {
      throw Errors.FailedToRollbackStock({ e });
    }
  }
}
