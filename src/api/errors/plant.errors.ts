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

class PlantUpdateError extends BaseError {
  constructor() {
    super('plant/update/');
  }
  readonly FailedToUpdatePlant = this.createError(
    InternalServerErrorException,
    'failedToUpdatePlant',
    'Failed to update a Plant',
  );
}

class PlantDeleteError extends BaseError {
  constructor() {
    super('plant/delete/');
  }
  readonly FailedToDeletePlant = this.createError(
    InternalServerErrorException,
    'failedToDeletePlant',
    'Failed to delete a Plant',
  );
}

export const plantCreateError = new PlantCreateError();
export const plantUpdateError = new PlantUpdateError();
export const plantDeleteError = new PlantDeleteError();
