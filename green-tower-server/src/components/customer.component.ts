import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';

import { CustomerComponentError } from '../api/errors/customer-component.errors';

@Injectable()
export class CustomerComponent {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async checkCustomerExistence(
    filter: { id: string; farm: { id: string } },
    errorCode: string,
    params?: object,
  ): Promise<Customer> {
    const Errors = new CustomerComponentError(errorCode);
    const customer = await this.customerRepository.findOne({
      where: { ...filter },
      relations: ['farm', 'createdBy'],
      ...(params && { ...params }),
    });

    if (!customer) {
      throw Errors.CustomerNotFound();
    }
    return customer;
  }
}
