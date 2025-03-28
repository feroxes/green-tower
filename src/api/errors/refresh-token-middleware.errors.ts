import { UnauthorizedException } from '@nestjs/common';

import { BaseError } from './base.error';

export class RefreshTokenMiddlewareErrors extends BaseError {
  constructor() {
    super('');
  }

  readonly NoAuthorizationHeader = this.createError(
    UnauthorizedException,
    'noAuthorizationHeader',
    'No authorization header',
  );

  readonly NoTokenProvided = this.createError(UnauthorizedException, 'noTokenProvided', 'No token provided');

  readonly NoRefreshTokenProvided = this.createError(
    UnauthorizedException,
    'noRefreshTokenProvided',
    'No refresh token provided',
  );

  readonly InvalidToken = this.createError(UnauthorizedException, 'invalidToken', 'Invalid token');
}

export const refreshTokenMiddlewareErrors = new RefreshTokenMiddlewareErrors();
