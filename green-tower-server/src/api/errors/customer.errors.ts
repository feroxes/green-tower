import { InternalServerErrorException } from '@nestjs/common';

import { BaseError } from './base.error';

class CustomerCreateError extends BaseError {
  constructor() {
    super('customer/create/');
  }
  readonly FailedToCreateCustomer = this.createError(
    InternalServerErrorException,
    'failedToCreateCustomer',
    'Failed to create a Customer',
  );
}

class CustomerUpdateError extends BaseError {
  constructor() {
    super('customer/update/');
  }
  readonly FailedToUpdateCustomer = this.createError(
    InternalServerErrorException,
    'failedToUpdateCustomer',
    'Failed to update a Customer',
  );
}

export const customerCreateError = new CustomerCreateError();
export const customerUpdateError = new CustomerUpdateError();
