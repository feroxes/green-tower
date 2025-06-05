import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { AuthorizedGuard } from '@guards/authorized.guard';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';

import { Executor } from '@decorators/executor.decorator';

import { OrderService } from '@services/order/order.service';

import { OrderCreateDto, OrderDeleteDto, OrderListDto, OrderUpdateDto } from '@dtos/order.dto';

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

  @Get('list')
  @UseGuards(AuthorizedGuard)
  async list(@Body() orderListDto: OrderListDto, @Executor() executor: ExecutorType) {
    return this.orderService.list(orderListDto, executor);
  }

  @Post('delete')
  @UseGuards(AuthorizedGuard)
  @HttpCode(HttpStatus.OK)
  async delete(@Body() orderDeleteDto: OrderDeleteDto, @Executor() executor: ExecutorType) {
    return this.orderService.delete(orderDeleteDto, executor);
  }

  @Post('update')
  @UseGuards(AuthorizedGuard)
  async update(@Body() orderUpdateDto: OrderUpdateDto, @Executor() executor: ExecutorType) {
    return this.orderService.update(orderUpdateDto, executor);
  }
}
