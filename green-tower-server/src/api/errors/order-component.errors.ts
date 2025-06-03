import { NotFoundException } from '@nestjs/common';

import { BaseError } from './base.error';

export class OrderComponentError extends BaseError {
  constructor(code: string) {
    super(code);
  }

  readonly OrderNotFound = this.createError(NotFoundException, 'orderNotFound', 'Order not found');
}
