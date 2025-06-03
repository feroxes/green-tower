import { Injectable } from '@nestjs/common';

import { OrderCreateService } from './order-create.service';

import { OrderCreateDto } from '@dtos/order.dto';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class OrderService {
  constructor(private orderCreateService: OrderCreateService) {}

  async create(orderCreateDto: OrderCreateDto, executor: ExecutorType) {
    return this.orderCreateService.create(orderCreateDto, executor);
  }
}
