import { NotFoundException } from '@nestjs/common';

import { BaseError } from './base.error';

export class CustomerComponentError extends BaseError {
  constructor(code: string) {
    super(code);
  }

  readonly CustomerNotFound = this.createError(NotFoundException, 'customerNotFound', 'Customer not found');
}
