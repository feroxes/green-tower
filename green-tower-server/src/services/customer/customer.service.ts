import { Injectable } from '@nestjs/common';

import { Customer } from '../../entities/customer.entity';

import { CustomerCreateService } from './customer-create.service';
import { CustomerDeleteService } from './customer-delete.service';
import { CustomerUpdateService } from './customer-update.service';

import { CustomerCreateDto, CustomerDeleteDto, CustomerUpdateDto } from '../../api/dtos/customer.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerCreateService: CustomerCreateService,
    private readonly customerUpdateService: CustomerUpdateService,
    private readonly customerDeleteService: CustomerDeleteService,
  ) {}

  async create(customerCreateDto: CustomerCreateDto, executor: ExecutorType): Promise<Customer> {
    return this.customerCreateService.create(customerCreateDto, executor);
  }

  async update(customerUpdateDto: CustomerUpdateDto, executor: ExecutorType): Promise<Customer> {
    return this.customerUpdateService.update(customerUpdateDto, executor);
  }

  async delete(customerDeleteDto: CustomerDeleteDto, executor: ExecutorType): Promise<void> {
    return this.customerDeleteService.delete(customerDeleteDto, executor);
  }
}
