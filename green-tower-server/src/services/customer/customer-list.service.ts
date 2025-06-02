import { Injectable } from '@nestjs/common';

import { Customer } from '../../entities/customer.entity';

import { CustomerComponent } from '../../components/customer.component';
import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

import { CustomerListDto } from '../../api/dtos/customer.dto';

import { ExecutorType } from '../../api/types/auth.types';

import { ListResponseType } from '../../api/types/dto-types';

@Injectable()
export class CustomerListService {
  constructor(
    private readonly customerComponent: CustomerComponent,
    private readonly userComponent: UserComponent,
    private readonly farmComponent: FarmComponent,
  ) {}

  async list(customerListDto: CustomerListDto, executor: ExecutorType): Promise<ListResponseType<Customer>> {
    const useCase = 'customer/list/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    return this.customerComponent.list(executor, customerListDto.meta);
  }
}
