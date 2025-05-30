import { ConflictException, InternalServerErrorException } from '@nestjs/common';

import { BaseError } from './base.error';

class HarvestEntryCreateCutError extends BaseError {
  constructor() {
    super('harvestEntry/createCut/');
  }

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
