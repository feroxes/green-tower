import { InternalServerErrorException } from '@nestjs/common';

import { BaseError } from './base.error';

class PlantCreateError extends BaseError {
  constructor() {
    super('plant/create/');
  }
  readonly FailedToCreatePlant = this.createError(
    InternalServerErrorException,
    'failedToCreatePlant',
    'Failed to create a Plant',
  );
}

export const plantCreateError = new PlantCreateError();
