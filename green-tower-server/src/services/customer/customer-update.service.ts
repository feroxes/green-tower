import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../../entities/customer.entity';

import { CustomerComponent } from '../../components/customer.component';
import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

import { CustomerUpdateDto } from '../../api/dtos/customer.dto';

import { customerUpdateError } from '../../api/errors/customer.errors';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class CustomerUpdateService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly customerComponent: CustomerComponent,
    private readonly userComponent: UserComponent,
    private readonly farmComponent: FarmComponent,
  ) {}

  async update(customerUpdateDto: CustomerUpdateDto, executor: ExecutorType): Promise<Customer> {
    const useCase = 'customer/update/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    let customer = await this.customerComponent.checkCustomerExistence(
      { id: customerUpdateDto.id, farm: { id: executor.farmId } },
      useCase,
    );

    const dto = {
      ...customer,
      ...customerUpdateDto,
    };

    try {
      customer = await this.customerRepository.save(dto);
    } catch (e: unknown) {
      throw customerUpdateError.FailedToUpdateCustomer({ e });
    }

    return customer;
  }
}
