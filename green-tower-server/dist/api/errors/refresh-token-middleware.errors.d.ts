import { UnauthorizedException } from '@nestjs/common';
import { BaseError } from './base.error';
export declare class RefreshTokenMiddlewareErrors extends BaseError {
    constructor();
    readonly NoAuthorizationHeader: (params?: Record<string, any>) => UnauthorizedException;
    readonly NoTokenProvided: (params?: Record<string, any>) => UnauthorizedException;
    readonly NoRefreshTokenProvided: (params?: Record<string, any>) => UnauthorizedException;
    readonly InvalidToken: (params?: Record<string, any>) => UnauthorizedException;
}
export declare const refreshTokenMiddlewareErrors: RefreshTokenMiddlewareErrors;
