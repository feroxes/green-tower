import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order, OrderState } from '@entities/order.entity';
import { OrderItem, OrderItemType } from '@entities/order-item.entity';

import { HarvestEntryService } from '@services/harvest-entry/harvest-entry.service';

import { CustomerComponent } from '@components/customer.component';
import { FarmComponent } from '@components/farm.component';
import { PlantComponent } from '@components/plant.component';
import { UserComponent } from '@components/user.component';

import { OrderCreateDto } from '@dtos/order.dto';

import { orderCreateError } from '@errors/order.errors';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class OrderCreateService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private customerComponent: CustomerComponent,
    private plantComponent: PlantComponent,
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

    const grouped = await this.harvestEntryService.listGroupedByPlant(executor);

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

      if (item.type === OrderItemType.CUT) {
        if (!group.cut.totalGramsLeft || (item.amountOfGrams || 0) > group.cut.totalGramsLeft)
          throw orderCreateError.NotEnoughStock();
      } else {
        if (!group.plate.totalPlatesLeft || (item.amountOfPlates || 0) > group.plate.totalPlatesLeft)
          throw orderCreateError.NotEnoughStock();
      }
      const orderItem = this.orderItemRepository.create({
        plant,
        type: item.type,
        amountOfPlates: item.amountOfPlates,
        amountOfGrams: item.amountOfGrams,
        unitPrice: item.unitPrice,
        totalPrice: item.unitPrice * (item.amountOfPlates || item.amountOfGrams || 0),
      });

      orderItems.push(orderItem);
      totalPrice += orderItem.totalPrice;
    }

    const order = this.orderRepository.create({
      farm,
      customer,
      items: orderItems,
      state: OrderState.CREATED,
      totalPrice,
    });
    try {
      return await this.orderRepository.save(order);
    } catch (e: unknown) {
      throw orderCreateError.FailedToCreateOrder({ e });
    }
  }
}
