import { Injectable } from '@nestjs/common';

import { Customer } from '../../entities/customer.entity';

import { CustomerCreateService } from './customer-create.service';

import { CustomerCreateDto } from '../../api/dtos/customer.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class CustomerService {
  constructor(private readonly customerCreateService: CustomerCreateService) {}

  async create(dto: CustomerCreateDto, executor: ExecutorType): Promise<Customer> {
    return this.customerCreateService.create(dto, executor);
  }
}
