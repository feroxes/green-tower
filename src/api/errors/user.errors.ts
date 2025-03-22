import { ForbiddenException, NotFoundException } from '@nestjs/common';

import { BaseError } from './base.error';

class UserCreateError extends BaseError {
  constructor() {
    super('user/create/');
  }
  readonly FarmNotFound = this.createError(NotFoundException, 'farmNotFound', 'Farm not found');
}

class UserDeleteError extends BaseError {
  constructor() {
    super('user/delete/');
  }
  readonly OwnerCouldNotBeDeleted = this.createError(
    ForbiddenException,
    'ownerCouldNotBeDeleted',
    'Owner could not be deleted',
  );
  readonly FarmNotFound = this.createError(NotFoundException, 'farmNotFound', 'Farm not found');
}

class UserSetRoleError extends BaseError {
  constructor() {
    super('user/setRole/');
  }
  readonly OwnerCouldNotBeUpdated = this.createError(
    ForbiddenException,
    'ownerCouldNotBeUpdated',
    'Owner could not be updated',
  );
  readonly FarmNotFound = this.createError(NotFoundException, 'farmNotFound', 'Farm not found');
}

export const userCreateError = new UserCreateError();
export const userDeleteError = new UserDeleteError();
export const userSetRoleError = new UserSetRoleError();
