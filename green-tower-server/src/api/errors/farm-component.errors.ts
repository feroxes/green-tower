import { NotFoundException } from '@nestjs/common';

import { BaseError } from './base.error';

export class FarmGetComponentError extends BaseError {
  constructor(code: string) {
    super(code);
  }

  readonly FarmNotFound = this.createError(NotFoundException, 'farmNotFound', 'Farm not found');
}
