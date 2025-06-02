import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { Plant } from '../entities/plant.entity';

import { PlantListFiltersDto, PlantListSortersDto } from '../api/dtos/plant.dto';

import { CustomerComponentError } from '../api/errors/customer-component.errors';

import { ExecutorType } from '../api/types/auth.types';
import { SortDirectionType } from '../api/types/common.types';

import { ListMetaDto, ListResponseType } from '../api/types/dto-types';
import { List } from '../decorators/list.decorator';

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
      where: { ...filter, isDeleted: false },
      relations: ['farm', 'createdBy'],
      ...(params && { ...params }),
    });

    if (!customer) {
      throw Errors.CustomerNotFound();
    }
    return customer;
  }

  @List({
    entity: Customer,
    relations: ['farm', 'createdBy'],
    defaultSort: { field: 'name', order: SortDirectionType.ASC },
  })
  async list(executor: ExecutorType, meta: ListMetaDto): Promise<ListResponseType<Customer>> {
    return Promise.resolve({ itemList: [], meta: { page: 0, size: 0, total: 0 } });
  }
}
