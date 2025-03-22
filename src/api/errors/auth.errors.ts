import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { BaseError } from './base.error';

class RegisterError extends BaseError {
  constructor() {
    super('auth/register/');
  }

  readonly FailedToCreateFarm = this.createError(
    InternalServerErrorException,
    'failedToCreateFarm',
    'Failed to create a Farm',
  );

  readonly FailedToUpdateUser = this.createError(
    InternalServerErrorException,
    'failedToUpdateUser',
    'Failed to update a User',
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
