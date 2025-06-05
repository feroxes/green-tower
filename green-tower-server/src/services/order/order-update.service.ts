import { PlantingType } from '@entities/enums/planting-type.enum';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Order } from '@entities/order.entity';
import { OrderItem } from '@entities/order-item.entity';

import { HarvestEntryService } from '@services/harvest-entry/harvest-entry.service';

import { CustomerComponent } from '@components/customer.component';
import { FarmComponent } from '@components/farm.component';
import { HarvestEntryComponent } from '@components/harvest-entry.component';
import { OrderComponent } from '@components/order.component';
import { PlantComponent } from '@components/plant.component';
import { UserComponent } from '@components/user.component';

import { OrderUpdateDto } from '@dtos/order.dto';

import { orderUpdateError } from '@errors/order.errors';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class OrderUpdateService {
  constructor(
    private dataSource: DataSource,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private orderComponent: OrderComponent,
    private customerComponent: CustomerComponent,
    private plantComponent: PlantComponent,
    private harvestEntryService: HarvestEntryService,
    private harvestEntryComponent: HarvestEntryComponent,
  ) {}

  async update(orderUpdateDto: OrderUpdateDto, executor: ExecutorType): Promise<Order> {
    const useCase = 'order/update/';

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    const order = await this.orderComponent.checkOrderExistence(
      { id: orderUpdateDto.id, farm: { id: executor.farmId } },
      useCase,
    );

    const customer = await this.customerComponent.checkCustomerExistence(
      { id: orderUpdateDto.customerId, farm: { id: executor.farmId } },
      useCase,
    );

    try {
      return this.dataSource.transaction(async (manager) => {
        const newItems: OrderItem[] = [];
        let totalPrice = 0;

        for (const oldItem of order.items) {
          try {
            await this.harvestEntryComponent.rollbackHarvestEntry(useCase, manager, oldItem);
            await manager.remove(OrderItem, oldItem);
          } catch (e: unknown) {
            throw orderUpdateError.FailedToRollbackHarvestEntry({ e });
          }
        }
        const grouped = await this.harvestEntryService.listGroupedByPlantTransactional(executor, manager);

        for (const orderItemDto of orderUpdateDto.items) {
          const plant = await this.plantComponent.checkPlantExistence(
            { id: orderItemDto.plantId, farm: { id: executor.farmId } },
            useCase,
          );

          const isCut = orderItemDto.type === PlantingType.CUT;
          const requiredAmount = isCut ? orderItemDto.amountOfGrams : orderItemDto.amountOfPlates;

          const group = grouped.itemList.find((g) => g.plant.id === orderItemDto.plantId);
          if (!group) {
            throw orderUpdateError.PlantNotFound();
          }

          const availableAmount = isCut ? group.cut.totalGramsLeft : group.plate.totalPlatesLeft;
          if (!availableAmount || requiredAmount! > availableAmount) {
            throw orderUpdateError.NotEnoughStock();
          }

          const orderItem = manager.create(OrderItem);

          orderItem.plant = plant;
          orderItem.type = orderItemDto.type;
          orderItem.unitPrice = orderItemDto.unitPrice;
          orderItem.amountOfPlates = orderItemDto.amountOfPlates;
          orderItem.amountOfGrams = orderItemDto.amountOfGrams;
          orderItem.totalPrice = orderItemDto.unitPrice * requiredAmount!;

          const entries = isCut ? group.cut.entries : group.plate.entries;

          try {
            await manager.save(OrderItem, orderItem);
          } catch (e: unknown) {
            throw orderUpdateError.FailedToSaveOrderItem({ e });
          }

          try {
            await this.harvestEntryComponent.allocateHarvestEntry(
              useCase,
              manager,
              orderItem,
              entries,
              orderItem.type,
              requiredAmount!,
            );
          } catch (e: unknown) {
            throw orderUpdateError.FailedToAllocateHarvestEntry({ e });
          }
          newItems.push(orderItem);
          totalPrice += orderItem.totalPrice;
        }

        order.customer = customer;
        order.items = newItems;
        order.totalPrice = totalPrice;

        try {
          return manager.save(Order, order);
        } catch (e: unknown) {
          throw orderUpdateError.FailedToSaveOrder({ e });
        }
      });
    } catch (e: unknown) {
      throw orderUpdateError.FailedToUpdateOrder({ e });
    }
  }
}
