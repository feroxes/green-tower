import { NotFoundException } from '@nestjs/common';

import { BaseError } from './base.error';

export class HarvestEntryComponentError extends BaseError {
  constructor(useCase: string) {
    super(useCase);
  }

  readonly HarvestEntryNotFound = this.createError(NotFoundException, 'harvestEntryNotFound', 'HarvestEntry not found.');
} 