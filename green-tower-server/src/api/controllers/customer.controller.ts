import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthorizedGuard } from '../../guards/authorized.guard';

import { Customer } from '../../entities/customer.entity';

import { CustomerService } from '../../services/customer/customer.service';

import { CustomerCreateDto } from '../dtos/customer.dto';

import { ExecutorType } from '../types/auth.types';

import { Executor } from '../../decorators/executor.decorator';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('create')
  @UseGuards(AuthorizedGuard)
  async create(@Body() dto: CustomerCreateDto, @Executor() executor: ExecutorType): Promise<Customer> {
    return this.customerService.create(dto, executor);
  }
}
