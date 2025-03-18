import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { BaseError } from './base.error';

class UserCreateError extends BaseError {
  constructor() {
    super('user/create/');
  }
  readonly OwnerNotFound = this.createError(NotFoundException, 'ownerNotFound', 'Owner not found');
  readonly FarmNotFound = this.createError(NotFoundException, 'farmNotFound', 'Farm not found');
  readonly Forbidden = this.createError(ForbiddenException, 'forbidden', 'You do not have permission to create users');
}

export const userCreateError = new UserCreateError();
