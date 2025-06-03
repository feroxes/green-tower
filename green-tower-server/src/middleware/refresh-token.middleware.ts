import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { parse } from 'cookie';
import { NextFunction, Request, Response } from 'express';

import { TokenService } from '@services/token/token.service';

import { refreshTokenMiddlewareErrors } from '@errors/refresh-token-middleware.errors';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const cookieHeader = req.headers.cookie ?? '';
    const parsedCookies = parse(cookieHeader) as Record<string, string>;

    if (!authHeader) {
      throw refreshTokenMiddlewareErrors.NoAuthorizationHeader();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw refreshTokenMiddlewareErrors.NoTokenProvided();
    }
    try {
      req['user'] = this.jwtService.verify(token);
      return next();
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        const refreshToken = parsedCookies['refreshToken'];
        if (!refreshToken) {
          throw refreshTokenMiddlewareErrors.NoRefreshTokenProvided();
        }

        const newAccessToken = await this.tokenService.refreshAccessToken(refreshToken);

        req['user'] = this.jwtService.verify(newAccessToken);

        req.headers.authorization = `Bearer ${newAccessToken}`;
        if (req.baseUrl !== '/auth/logout') {
          res.setHeader('New-Access-Token', 'Bearer ' + newAccessToken);
        }

        return next();
      } else {
        throw refreshTokenMiddlewareErrors.InvalidToken();
      }
    }
  }
}
