import { NotFoundException } from '@nestjs/common';

import { BaseError } from './base.error';

export class PlantingComponentError extends BaseError {
  constructor(code: string) {
    super(code);
  }

  readonly PlantingNotFound = this.createError(NotFoundException, 'plantingNotFound', 'Planting not found');
}
