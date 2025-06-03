import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { List } from '@decorators/list.decorator';

import { Order } from '@entities/order.entity';
import { Plant } from '@entities/plant.entity';

import { PlantListFiltersDto, PlantListSortersDto } from '@dtos/plant.dto';

import { OrderComponentError } from '@errors/order-component.errors';

import { ExecutorType } from '@app-types/auth.types';
import { SortDirectionType } from '@app-types/common.types';
import { ListMetaDto, ListResponseType } from '@app-types/dto.types';

@Injectable()
export class OrderComponent {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async checkOrderExistence(
    filter: { id: string; farm: { id: string } },
    errorCode: string,
    params?: object,
  ): Promise<Order> {
    const Errors = new OrderComponentError(errorCode);
    const order = await this.orderRepository.findOne({
      where: { ...filter },
      ...(params && { ...params }),
    });
    if (!order) {
      throw Errors.OrderNotFound();
    }
    return order;
  }

  @List({
    entity: Order,
    relations: ['farm', 'items'],
    defaultSort: { field: 'createdAt', order: SortDirectionType.ASC },
  })
  async list(executor: ExecutorType, meta: ListMetaDto): Promise<ListResponseType<Order>> {
    return Promise.resolve({ itemList: [], meta: { page: 0, size: 0, total: 0 } });
  }
}
