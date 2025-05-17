import { InternalServerErrorException } from '@nestjs/common';

import { BaseError } from './base.error';

class PlantingCreateError extends BaseError {
  constructor() {
    super('planting/create/');
  }
  readonly FailedToCreatePlanting = this.createError(
    InternalServerErrorException,
    'failedToCreatePlanting',
    'Failed to create a Planting',
  );
}

export const plantingCreateError = new PlantingCreateError();
