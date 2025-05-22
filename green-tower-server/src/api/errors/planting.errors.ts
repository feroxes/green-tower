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
class PlantingUpdateError extends BaseError {
  constructor() {
    super('planting/update/');
  }
  readonly FailedToUpdatePlanting = this.createError(
    InternalServerErrorException,
    'failedToUpdatePlanting',
    'Failed to update a Planting',
  );
}

export const plantingCreateError = new PlantingCreateError();
export const plantingUpdateError = new PlantingUpdateError();
