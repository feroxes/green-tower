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
  readonly FailedToSaveOrder = this.createError(
    InternalServerErrorException,
    'failedToSaveOrder',
    'Failed to save an Order',
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

class OrderDeleteError extends BaseError {
  constructor() {
    super('order/delete/');
  }
  readonly FailedToDeleteOrder = this.createError(
    InternalServerErrorException,
    'failedToDeleteOrder',
    'Failed to delete an Order',
  );
}

class OrderUpdateError extends BaseError {
  constructor() {
    super('order/update/');
  }
  readonly PlantNotFound = this.createError(NotFoundException, 'plantNotFound', 'Plant not found');

  readonly NotEnoughStock = this.createError(
    ConflictException,
    'notEnoughStock',
    'Not enough stock for one or more items.',
  );

  readonly FailedToUpdateOrder = this.createError(
    InternalServerErrorException,
    'failedToUpdateOrder',
    'Failed to update an Order.',
  );

  readonly FailedToRollbackHarvestEntry = this.createError(
    InternalServerErrorException,
    'failedToRollbackHarvestEntry',
    'Failed to rollback Harvest Entry.',
  );

  readonly FailedToSaveOrderItem = this.createError(
    InternalServerErrorException,
    'failedToSaveOrderItem',
    'Failed to save Order Item.',
  );

  readonly FailedToSaveOrder = this.createError(
    InternalServerErrorException,
    'failedToSaveOrder',
    'Failed to save Order.',
  );

  readonly FailedToAllocateHarvestEntry = this.createError(
    InternalServerErrorException,
    'failedToAllocateHarvestEntry',
    'Failed to allocate Harvest Entry.',
  );
}

export const orderCreateError = new OrderCreateError();
export const orderDeleteError = new OrderDeleteError();
export const orderUpdateError = new OrderUpdateError();
