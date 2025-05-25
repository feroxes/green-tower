import { ConflictException, InternalServerErrorException } from '@nestjs/common';

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
  readonly PlantingIsNotInProperState = this.createError(
    InternalServerErrorException,
    'plantingIsNotInProperState',
    'Planting is not in proper state.',
  );
}

class PlantingDeleteError extends BaseError {
  constructor() {
    super('planting/delete/');
  }
  readonly FailedToDeletePlanting = this.createError(
    InternalServerErrorException,
    'failedToDeletePlanting',
    'Failed to delete a Planting',
  );
}

class PlantingSetStateError extends BaseError {
  constructor() {
    super('planting/setState/');
  }
  readonly PlantingIsInFinalState = this.createError(
    ConflictException,
    'plantingIsInFinalState',
    'Planting is in final state',
  );
  readonly CannotSetGrowingState = this.createError(
    ConflictException,
    'cannotSetGrowingState',
    'Cannot set growing state - harvest time has been reached',
  );
  readonly FailedToSetPlantingState = this.createError(
    InternalServerErrorException,
    'failedToSetPlantingState',
    'Failed to set planting state',
  );
}

export const plantingCreateError = new PlantingCreateError();
export const plantingUpdateError = new PlantingUpdateError();
export const plantingDeleteError = new PlantingDeleteError();
export const plantingSetStateError = new PlantingSetStateError();
