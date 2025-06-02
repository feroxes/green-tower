import { BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';

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

class HarvestEntryCutPlateError extends BaseError {
  constructor() {
    super('harvestEntry/cutPlate/');
  }

  readonly InvalidHarvestEntryType = this.createError(
    BadRequestException,
    'invalidHarvestEntryType',
    'HarvestEntry type must be PLATE to perform this operation.',
  );

  readonly NotEnoughPlates = this.createError(BadRequestException, 'notEnoughPlates', 'Not enough plates available.');

  readonly FailedToCutPlate = this.createError(
    InternalServerErrorException,
    'failedToCutPlate',
    'Failed to convert plate to cut.',
  );
}

export const harvestEntryCreateCutError = new HarvestEntryCreateCutError();
export const harvestEntryCreatePlateError = new HarvestEntryCreatePlateError();
export const harvestEntryCutPlateError = new HarvestEntryCutPlateError();
