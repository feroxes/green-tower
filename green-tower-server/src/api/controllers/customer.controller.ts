import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthorizedGuard } from '../../guards/authorized.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { OwnerOrAdminGuard } from '../../guards/owner-or-admin.guard';

import { Customer } from '../../entities/customer.entity';

import { CustomerService } from '../../services/customer/customer.service';

import { CustomerCreateDto, CustomerDeleteDto, CustomerUpdateDto } from '../dtos/customer.dto';

import { ExecutorType } from '../types/auth.types';

import { Executor } from '../../decorators/executor.decorator';

@Controller('customer')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('create')
  @UseGuards(AuthorizedGuard)
  async create(@Body() customerCreateDto: CustomerCreateDto, @Executor() executor: ExecutorType): Promise<Customer> {
    return this.customerService.create(customerCreateDto, executor);
  }

  @Post('update')
  @UseGuards(AuthorizedGuard)
  async update(@Body() customerUpdateDto: CustomerUpdateDto, @Executor() executor: ExecutorType): Promise<Customer> {
    return this.customerService.update(customerUpdateDto, executor);
  }

  @Post('delete')
  @UseGuards(OwnerOrAdminGuard)
  async delete(@Body() customerDeleteDto: CustomerDeleteDto, @Executor() executor: ExecutorType): Promise<void> {
    return this.customerService.delete(customerDeleteDto, executor);
  }
}
