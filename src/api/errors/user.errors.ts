import { ForbiddenException, NotFoundException } from '@nestjs/common';

import { BaseError } from './base.error';

class UserCreateError extends BaseError {
  constructor() {
    super('user/create/');
  }
  readonly OwnerNotFound = this.createError(NotFoundException, 'ownerNotFound', 'Owner not found');
  readonly FarmNotFound = this.createError(NotFoundException, 'farmNotFound', 'Farm not found');
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
  readonly UserNotFound = this.createError(NotFoundException, 'userNotFound', 'User not found');
}

class UserSetRoleError extends BaseError {
  constructor() {
    super('user/setRole/');
  }
  readonly OwnerNotFound = this.createError(NotFoundException, 'ownerNotFound', 'Owner not found');
  readonly OwnerCouldNotBeUpdated = this.createError(
    ForbiddenException,
    'ownerCouldNotBeUpdated',
    'Owner could not be updated',
  );
  readonly FarmNotFound = this.createError(NotFoundException, 'farmNotFound', 'Farm not found');
  readonly UserNotFound = this.createError(NotFoundException, 'userNotFound', 'User not found');
}

export const userCreateError = new UserCreateError();
export const userDeleteError = new UserDeleteError();
export const userSetRoleError = new UserSetRoleError();
