import { Injectable } from '@nestjs/common';

import { CustomerCreateService } from './customer-create.service';
import { CustomerDeleteService } from './customer-delete.service';
import { CustomerListService } from './customer-list.service';
import { CustomerUpdateService } from './customer-update.service';

import { CustomerCreateDto, CustomerDeleteDto, CustomerListDto, CustomerUpdateDto } from '@dtos/customer.dto';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerCreateService: CustomerCreateService,
    private readonly customerUpdateService: CustomerUpdateService,
    private readonly customerDeleteService: CustomerDeleteService,
    private readonly customerListService: CustomerListService,
  ) {}

  async create(customerCreateDto: CustomerCreateDto, executor: ExecutorType) {
    return this.customerCreateService.create(customerCreateDto, executor);
  }

  async update(customerUpdateDto: CustomerUpdateDto, executor: ExecutorType) {
    return this.customerUpdateService.update(customerUpdateDto, executor);
  }

  async delete(customerDeleteDto: CustomerDeleteDto, executor: ExecutorType) {
    return this.customerDeleteService.delete(customerDeleteDto, executor);
  }

  async list(customerListDto: CustomerListDto, executor: ExecutorType) {
    return this.customerListService.list(customerListDto, executor);
  }
}
