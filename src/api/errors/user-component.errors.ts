import { ConflictException } from '@nestjs/common';
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
