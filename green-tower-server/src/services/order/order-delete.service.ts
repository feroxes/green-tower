import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { Order } from '@entities/order.entity';
import { OrderItem } from '@entities/order-item.entity';

import { FarmComponent } from '@components/farm.component';
import { HarvestEntryComponent } from '@components/harvest-entry.component';
import { OrderComponent } from '@components/order.component';
import { UserComponent } from '@components/user.component';

import { OrderDeleteDto } from '@dtos/order.dto';

import { orderDeleteError } from '@errors/order.errors';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class OrderDeleteService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private orderComponent: OrderComponent,
    private harvestEntryComponent: HarvestEntryComponent,
  ) {}

  async delete(orderDeleteDto: OrderDeleteDto, executor: ExecutorType): Promise<void> {
    const useCase = 'order/delete/';

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    const order = await this.orderComponent.checkOrderExistence(
      { id: orderDeleteDto.id, farm: { id: executor.farmId } },
      useCase,
    );

    try {
      await this.entityManager.transaction(async (manager) => {
        for (const item of order.items) {
          await this.harvestEntryComponent.rollbackHarvestEntry(useCase, manager, item);
        }

        await manager.remove(OrderItem, order.items);
        await manager.remove(Order, order);
      });
    } catch (e: unknown) {
      throw orderDeleteError.FailedToDeleteOrder({ e });
    }
  }
}
