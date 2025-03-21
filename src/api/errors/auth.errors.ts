import { ConflictException, UnauthorizedException } from '@nestjs/common';

import { BaseError } from './base.error';

class RegisterError extends BaseError {
  constructor() {
    super('auth/register/');
  }

  readonly UserAlreadyExists = this.createError(
    ConflictException,
    'userAlreadyExists',
    'User with this email already exists',
  );
}

class LoginError extends BaseError {
  constructor() {
    super('auth/login/');
  }

  readonly InvalidCredentials = this.createError(UnauthorizedException, 'invalidCredentials', 'Invalid credentials');
}

export const registerError = new RegisterError();
export const loginError = new LoginError();
