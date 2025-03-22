import { ForbiddenException, InternalServerErrorException } from '@nestjs/common';

import { BaseError } from './base.error';

class UserCreateError extends BaseError {
  constructor() {
    super('user/create/');
  }
}

class UserUpdateError extends BaseError {
  constructor() {
    super('user/update/');
  }
  readonly UserUpdateForbidden = this.createError(ForbiddenException, 'userUpdateForbidden', 'User update forbidden');

  readonly FailedToUpdateUser = this.createError(
    InternalServerErrorException,
    'failedToUpdateUser',
    'Failed to update a User',
  );
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
  readonly FailedToDeleteUser = this.createError(
    InternalServerErrorException,
    'failedToDeleteUser',
    'Failed to delete a User',
  );
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
  readonly FailedToSetUserRole = this.createError(
    InternalServerErrorException,
    'failedToSetUserRole',
    'Failed to set user role',
  );
}

export const userCreateError = new UserCreateError();
export const userUpdateError = new UserUpdateError();
export const userDeleteError = new UserDeleteError();
export const userSetRoleError = new UserSetRoleError();
