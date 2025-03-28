import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { BaseError } from './base.error';

export class GenerateTokensErrors extends BaseError {
  constructor() {
    super('');
  }

  readonly FailedToUpdateUser = this.createError(
    InternalServerErrorException,
    'failedToUpdateUser',
    'Failed to update a user',
  );
}

export class RefreshAccessTokenErrors extends BaseError {
  constructor() {
    super('');
  }

  readonly RefreshTokenVerificationFailed = this.createError(
    UnauthorizedException,
    'refreshTokenVerificationError',
    'Refresh token verification failed',
  );

  readonly UserDoesNotExist = this.createError(UnauthorizedException, 'userDoesNotExist', 'User does not exist');

  readonly InvalidRefreshToken = this.createError(
    UnauthorizedException,
    'invalidRefreshToken',
    'Invalid refresh token',
  );
}

export const refreshAccessTokenErrors = new RefreshAccessTokenErrors();
export const generateTokensErrors = new GenerateTokensErrors();
