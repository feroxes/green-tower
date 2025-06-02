import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../../entities/customer.entity';

import { CustomerComponent } from '../../components/customer.component';
import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

import { CustomerDeleteDto } from '../../api/dtos/customer.dto';

import { customerDeleteError } from '../../api/errors/customer.errors';

import { ExecutorType } from '../../api/types/auth.types';

import { ErrorCodes } from '../../utils/constants';

@Injectable()
export class CustomerDeleteService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly customerComponent: CustomerComponent,
    private readonly userComponent: UserComponent,
    private readonly farmComponent: FarmComponent,
  ) {}

  async delete(customerDeleteDto: CustomerDeleteDto, executor: ExecutorType): Promise<void> {
    const useCase = 'customer/delete/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);
    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    const customer = await this.customerComponent.checkCustomerExistence(
      { id: customerDeleteDto.id, farm: { id: executor.farmId } },
      useCase,
    );

    try {
      await this.customerRepository.remove(customer);
    } catch (e: unknown) {
      if (e instanceof Error && 'code' in e) {
        const error = e as { code: string; message: string };
        if (error.code === ErrorCodes.DB.foreignKeyViolation) {
          await this.customerRepository.save({ ...customer, isDeleted: true });
        }
      } else throw customerDeleteError.FailedToDeleteCustomer({ e });
    }
  }
}
