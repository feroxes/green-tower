import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../../entities/customer.entity';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

import { CustomerCreateDto } from '../../api/dtos/customer.dto';

import { customerCreateError } from '../../api/errors/customer.errors';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class CustomerCreateService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly userComponent: UserComponent,
    private readonly farmComponent: FarmComponent,
  ) {}

  async create(customerCreateDto: CustomerCreateDto, executor: ExecutorType): Promise<Customer> {
    const useCase = 'customer/create/';
    const user = await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    const farm = await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    const dto = {
      ...customerCreateDto,
      createdBy: user,
      farm,
    };

    let customer = this.customerRepository.create(dto);

    try {
      customer = await this.customerRepository.save(customer);
    } catch (e: unknown) {
      throw customerCreateError.FailedToCreateCustomer({ e });
    }
    return customer;
  }
}
