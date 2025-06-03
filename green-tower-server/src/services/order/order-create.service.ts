import { PlantingType } from '@entities/enums/planting-type.enum';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { HarvestEntry } from '@entities/harvest-entry.entity';
import { Order, OrderState } from '@entities/order.entity';
import { OrderItem } from '@entities/order-item.entity';

import { HarvestEntryService } from '@services/harvest-entry/harvest-entry.service';

import { CustomerComponent } from '@components/customer.component';
import { FarmComponent } from '@components/farm.component';
import { HarvestEntryComponent } from '@components/harvest-entry.component';
import { PlantComponent } from '@components/plant.component';
import { UserComponent } from '@components/user.component';

import { OrderCreateDto } from '@dtos/order.dto';

import { orderCreateError } from '@errors/order.errors';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class OrderCreateService {
  constructor(
    private dataSource: DataSource,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private customerComponent: CustomerComponent,
    private plantComponent: PlantComponent,
    private harvestEntryComponent: HarvestEntryComponent,
    private harvestEntryService: HarvestEntryService,
  ) {}

  async create(orderCreateDto: OrderCreateDto, executor: ExecutorType): Promise<Order> {
    const useCase = 'order/create/';

    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    const farm = await this.farmComponent.checkFarmExistence(executor.farmId, useCase);
    const customer = await this.customerComponent.checkCustomerExistence(
      { id: orderCreateDto.customerId, farm: { id: executor.farmId } },
      useCase,
    );

    // TODO { lock: { mode: 'pessimistic_write' } } ?
    const grouped = await this.harvestEntryService.listGroupedByPlant(executor);

    try {
      return await this.dataSource.transaction(async (manager) => {
        const orderItems: OrderItem[] = [];
        let totalPrice = 0;

        for (const item of orderCreateDto.items) {
          const plant = await this.plantComponent.checkPlantExistence(
            { id: item.plantId, farm: { id: executor.farmId } },
            useCase,
          );
          const group = grouped.itemList.find((g) => g.plant.id === item.plantId);
          if (!group) {
            throw orderCreateError.PlantNotFound();
          }
          const isCut = item.type === PlantingType.CUT;
          const availableAmount = isCut ? group.cut.totalGramsLeft : group.plate.totalPlatesLeft;
          const requiredAmount = item.amountOfGrams ?? item.amountOfPlates ?? 0;

          if (!availableAmount || requiredAmount > availableAmount) {
            throw orderCreateError.NotEnoughStock();
          }

          const entries = isCut ? group.cut.entries : group.plate.entries;

          const updatedEntries = await this.harvestEntryComponent.allocateStock(
            useCase,
            manager,
            entries,
            item.type,
            requiredAmount,
          );

          await manager.save(HarvestEntry, updatedEntries);

          const orderItem = manager.create(OrderItem, {
            plant,
            type: item.type,
            amountOfPlates: item.amountOfPlates,
            amountOfGrams: item.amountOfGrams,
            unitPrice: item.unitPrice,
            totalPrice: item.unitPrice * requiredAmount,
          });

          orderItems.push(orderItem);
          totalPrice += orderItem.totalPrice;
        }

        const order = manager.create(Order, {
          farm,
          customer,
          items: orderItems,
          state: OrderState.CREATED,
          totalPrice,
        });

        return manager.save(Order, order);
      });
    } catch (e: unknown) {
      throw orderCreateError.FailedToCreateOrder({ e });
    }
  }
}
