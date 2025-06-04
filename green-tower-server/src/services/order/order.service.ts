import { Injectable } from '@nestjs/common';

import { OrderCreateService } from './order-create.service';
import { OrderListService } from './order-list.service';
import { OrderDeleteService } from '@services/order/order-delete.service';

import { OrderCreateDto, OrderDeleteDto, OrderListDto } from '@dtos/order.dto';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class OrderService {
  constructor(
    private orderCreateService: OrderCreateService,
    private orderListService: OrderListService,
    private orderDeleteService: OrderDeleteService,
  ) {}

  async create(orderCreateDto: OrderCreateDto, executor: ExecutorType) {
    return this.orderCreateService.create(orderCreateDto, executor);
  }

  async list(orderListDto: OrderListDto, executor: ExecutorType) {
    return this.orderListService.list(orderListDto, executor);
  }

  async delete(orderDeleteDto: OrderDeleteDto, executor: ExecutorType) {
    return this.orderDeleteService.delete(orderDeleteDto, executor);
  }
}
