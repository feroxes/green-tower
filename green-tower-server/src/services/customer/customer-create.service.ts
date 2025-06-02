import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../../entities/customer.entity';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

import { CustomerCreateDto } from '../../api/dtos/customer.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class CustomerCreateService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly userComponent: UserComponent,
    private readonly farmComponent: FarmComponent,
  ) {}

  async create(dto: CustomerCreateDto, executor: ExecutorType): Promise<Customer> {
    const user = await this.userComponent.checkUserExistence(executor.id, executor.farmId, 'CUSTOMER_CREATE');
    const farm = await this.farmComponent.checkFarmExistence(executor.farmId, 'CUSTOMER_CREATE');

    const customer = this.customerRepository.create({
      ...dto,
      createdBy: user,
      farm,
    });

    return this.customerRepository.save(customer);
  }
}
