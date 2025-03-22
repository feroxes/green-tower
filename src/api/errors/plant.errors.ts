import { BaseError } from './base.error';

class PlantCreateError extends BaseError {
  constructor() {
    super('plant/create/');
  }
}

export const plantCreateError = new PlantCreateError();
