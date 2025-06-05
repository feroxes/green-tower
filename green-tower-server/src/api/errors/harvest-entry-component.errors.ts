import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { BaseError } from './base.error';

export class HarvestEntryComponentError extends BaseError {
  constructor(useCase: string) {
    super(useCase);
  }

  readonly HarvestEntryNotFound = this.createError(
    NotFoundException,
    'harvestEntryNotFound',
    'HarvestEntry not found.',
  );

  readonly NotEnoughStock = this.createError(NotFoundException, 'notEnoughStock', 'Not enough stock.');

  readonly FailedToCreateOrderItemHarvestEntry = this.createError(
    InternalServerErrorException,
    'failedToCreateOrderItemHarvestEntry',
    'Failed to create order item harvest entry.',
  );

  readonly FailedToCreateHarvestEntry = this.createError(
    InternalServerErrorException,
    'failedToCreateHarvestEntry',
    'Failed to create harvest entry.',
  );

  readonly FailedToRollbackStock = this.createError(
    InternalServerErrorException,
    'failedToRollbackStock',
    'Failed to rollback stock.',
  );
}
