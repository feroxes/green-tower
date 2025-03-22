import { ConflictException, NotFoundException } from '@nestjs/common';

import { BaseError } from './base.error';

export class UserCreateComponentError extends BaseError {
  constructor(code: string) {
    super(code);
  }

  readonly UserAlreadyExists = this.createError(
    ConflictException,
    'userAlreadyExists',
    'User with this email already exists',
  );
}

export class UserCheckExistenceComponentError extends BaseError {
  constructor(code: string) {
    super(code);
  }

  readonly UserNotFound = this.createError(NotFoundException, 'userNotFound', 'User not found');
}
