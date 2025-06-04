import { PlantingType } from '@entities/enums/planting-type.enum';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { HarvestEntry, HarvestEntryState } from '@entities/harvest-entry.entity';
import { Order } from '@entities/order.entity';
import { OrderItem } from '@entities/order-item.entity';
import { OrderItemHarvestEntry } from '@entities/order-item-harvest-entry.entity';

import { FarmComponent } from '@components/farm.component';
import { OrderComponent } from '@components/order.component';
import { UserComponent } from '@components/user.component';

import { OrderDeleteDto } from '@dtos/order.dto';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class OrderDeleteService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private orderComponent: OrderComponent,
  ) {}

  async delete(orderDeleteDto: OrderDeleteDto, executor: ExecutorType): Promise<void> {
    const useCase = 'order/delete/';

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    const order = await this.orderComponent.checkOrderExistence(
      { id: orderDeleteDto.id, farm: { id: executor.farmId } },
      useCase,
    );

    await this.entityManager.transaction(async (manager) => {
      const allRelations = await manager.find(OrderItemHarvestEntry, {
        where: { orderItem: { order: { id: order.id } } },
        relations: ['orderItem', 'harvestEntry'],
      });

      for (const relation of allRelations) {
        const entry = await manager.findOne(HarvestEntry, {
          where: { id: relation.harvestEntry.id },
        });
        if (!entry) continue;

        if (relation.orderItem.type === PlantingType.CUT) {
          entry.harvestGramsLeft = (entry.harvestGramsLeft || 0) + relation.amountTaken;
        } else {
          entry.harvestAmountOfPlatesLeft = (entry.harvestAmountOfPlatesLeft || 0) + relation.amountTaken;
        }

        if (entry.state === HarvestEntryState.SOLD) {
          entry.state = HarvestEntryState.READY;
        }

        await manager.save(entry);
      }

      await manager.remove(OrderItemHarvestEntry, allRelations);
      await manager.remove(OrderItem, order.items);
      await manager.remove(Order, order);
    });
  }
}
