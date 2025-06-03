import { Injectable } from '@nestjs/common';

import { OrderCreateService } from './order-create.service';
import { OrderListService } from './order-list.service';

import { OrderCreateDto, OrderListDto } from '@dtos/order.dto';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class OrderService {
  constructor(
    private orderCreateService: OrderCreateService,
    private orderListService: OrderListService,
  ) {}

  async create(orderCreateDto: OrderCreateDto, executor: ExecutorType) {
    return this.orderCreateService.create(orderCreateDto, executor);
  }

  async list(orderListDto: OrderListDto, executor: ExecutorType) {
    return this.orderListService.list(orderListDto, executor);
  }
}
