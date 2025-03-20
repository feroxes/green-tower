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

class UserDeleteError extends BaseError {
  constructor() {
    super('user/delete/');
  }
  readonly OwnerNotFound = this.createError(NotFoundException, 'ownerNotFound', 'Owner not found');
  readonly OwnerCouldNotBeDeleted = this.createError(
    ForbiddenException,
    'ownerCouldNotBeDeleted',
    'Owner could not be deleted',
  );
  readonly FarmNotFound = this.createError(NotFoundException, 'farmNotFound', 'Farm not found');
  readonly Forbidden = this.createError(ForbiddenException, 'forbidden', 'You do not have permission to create users');
  readonly UserNotFound = this.createError(NotFoundException, 'userNotFound', 'User not found');
}

export const userCreateError = new UserCreateError();
export const userDeleteError = new UserDeleteError();
