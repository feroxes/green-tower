import { NotFoundException } from '@nestjs/common';

import { BaseError } from './base.error';

export class PlantComponentError extends BaseError {
  constructor(code: string) {
    super(code);
  }

  readonly PlantNotFound = this.createError(NotFoundException, 'plantNotFound', 'Plant not found');
}
