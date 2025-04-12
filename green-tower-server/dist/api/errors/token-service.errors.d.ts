import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { BaseError } from './base.error';
export declare class GenerateTokensErrors extends BaseError {
    constructor();
    readonly FailedToUpdateUser: (params?: Record<string, any>) => InternalServerErrorException;
}
export declare class RefreshAccessTokenErrors extends BaseError {
    constructor();
    readonly RefreshTokenVerificationFailed: (params?: Record<string, any>) => UnauthorizedException;
    readonly UserDoesNotExist: (params?: Record<string, any>) => UnauthorizedException;
    readonly InvalidRefreshToken: (params?: Record<string, any>) => UnauthorizedException;
}
export declare const refreshAccessTokenErrors: RefreshAccessTokenErrors;
export declare const generateTokensErrors: GenerateTokensErrors;
