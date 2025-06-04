import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { BaseError } from './base.error';

class OrderCreateError extends BaseError {
  constructor() {
    super('order/create/');
  }
  readonly FailedToCreateOrder = this.createError(
    InternalServerErrorException,
    'failedToCreateOrder',
    'Failed to create an Order',
  );
  readonly NotEnoughStock = this.createError(
    ConflictException,
    'notEnoughStock',
    'Not enough stock for one or more items',
  );
  readonly FailedToCreateOrderItem = this.createError(
    InternalServerErrorException,
    'FailedToCreateOrderItem',
    'Failed to create Order Item',
  );
  readonly PlantNotFound = this.createError(NotFoundException, 'plantNotFound', 'Plant not found');
}

export const orderCreateError = new OrderCreateError();
