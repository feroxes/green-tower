import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthorizedGuard } from '@guards/authorized.guard';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';

import { Executor } from '@decorators/executor.decorator';

import { OrderService } from '@services/order/order.service';

import { OrderCreateDto } from '@dtos/order.dto';

import { ExecutorType } from '@app-types/auth.types';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @UseGuards(AuthorizedGuard)
  async create(@Body() orderCreateDto: OrderCreateDto, @Executor() executor: ExecutorType) {
    return this.orderService.create(orderCreateDto, executor);
  }
}
