import { NotFoundException } from '@nestjs/common';

import { BaseError } from './base.error';

class PlantCreateError extends BaseError {
  constructor() {
    super('plant/create/');
  }
  readonly FarmNotFound = this.createError(NotFoundException, 'farmNotFound', 'Farm not found');
}

export const plantCreateError = new PlantCreateError();
