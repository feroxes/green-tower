import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { BaseError } from './base.error';

class GetError extends BaseError {
  constructor() {
    super('farm/get/');
  }
  readonly FarmNotFound = this.createError(NotFoundException, 'farmNotFound', 'Farm not found');
  readonly Forbidden = this.createError(
    ForbiddenException,
    'forbidden',
    'You do not have permission to access this farm',
  );
}

export const getError = new GetError();
