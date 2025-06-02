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

class CustomerDeleteError extends BaseError {
  constructor() {
    super('customer/delete/');
  }
  readonly FailedToDeleteCustomer = this.createError(
    InternalServerErrorException,
    'failedToDeleteCustomer',
    'Failed to delete a Customer',
  );
}

export const customerCreateError = new CustomerCreateError();
export const customerUpdateError = new CustomerUpdateError();
export const customerDeleteError = new CustomerDeleteError();
