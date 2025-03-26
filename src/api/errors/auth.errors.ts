import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { BaseError } from './base.error';

export class RegisterError extends BaseError {
  constructor() {
    super('auth/register/');
  }

  readonly FailedToCreateFarm = this.createError(
    InternalServerErrorException,
    'failedToCreateFarm',
    'Failed to create a farm',
  );

  readonly FailedToUpdateUser = this.createError(
    InternalServerErrorException,
    'failedToUpdateUser',
    'Failed to update a user',
  );

  readonly FailedToSendConfirmationEmail = this.createError(
    InternalServerErrorException,
    'failedToSendConfirmationEmail',
    'Failed to send confirmation email',
  );
}

class LoginError extends BaseError {
  constructor() {
    super('auth/login/');
  }

  readonly InvalidCredentials = this.createError(UnauthorizedException, 'invalidCredentials', 'Invalid credentials');

  readonly EmailNotConfirmed = this.createError(
    UnauthorizedException,
    'emailNotConfirmed',
    'Please confirm your email before logging in',
  );
}

export class ConfirmEmailError extends BaseError {
  constructor() {
    super('auth/confirmEmail/');
  }

  readonly InvalidConfirmationToken = this.createError(
    ConflictException,
    'invalidConfirmationToken',
    'Invalid or expired confirmation token',
  );

  readonly ConfirmationTokenExpired = this.createError(
    ConflictException,
    'confirmationTokenExpired',
    'Confirmation token has expired',
  );

  readonly FailedToUpdateUser = this.createError(
    InternalServerErrorException,
    'failedToUpdateUser',
    'Failed to update a user',
  );
}

export const registerError = new RegisterError();
export const loginError = new LoginError();
export const confirmEmailError = new ConfirmEmailError();
