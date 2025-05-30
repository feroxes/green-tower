import { ConflictException, InternalServerErrorException } from '@nestjs/common';

import { BaseError } from './base.error';

class HarvestEntryCreateCutError extends BaseError {
  constructor() {
    super('harvestEntry/createCut/');
  }

  readonly InvalidDto = this.createError(ConflictException, 'invalidDto', 'PlantingId is not allowed.');

  readonly PlantingIsNotInProperState = this.createError(
    ConflictException,
    'plantingIsNotInProperState',
    'Planting is not in proper state.',
  );

  readonly FailedToCreateHarvestEntry = this.createError(
    InternalServerErrorException,
    'failedToCreateHarvestEntry',
    'Failed to create a Harvest Entry.',
  );
}

class HarvestEntryCreatePlateError extends BaseError {
  constructor() {
    super('harvestEntry/createPlate/');
  }
  readonly InvalidDto = this.createError(ConflictException, 'invalidDto', 'PlantingId is not allowed.');

  readonly PlantingIsNotInProperState = this.createError(
    ConflictException,
    'plantingIsNotInProperState',
    'Planting is not in proper state.',
  );

  readonly FailedToCreateHarvestEntry = this.createError(
    InternalServerErrorException,
    'failedToCreateHarvestEntry',
    'Failed to create a Harvest Entry.',
  );
}

export const harvestEntryCreateCutError = new HarvestEntryCreateCutError();
export const harvestEntryCreatePlateError = new HarvestEntryCreatePlateError();
