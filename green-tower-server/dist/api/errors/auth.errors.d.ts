import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { BaseError } from './base.error';
export declare class RegisterError extends BaseError {
    constructor();
    readonly FailedToCreateFarm: (params?: Record<string, any>) => InternalServerErrorException;
    readonly FailedToUpdateUser: (params?: Record<string, any>) => InternalServerErrorException;
    readonly FailedToSendConfirmationEmail: (params?: Record<string, any>) => InternalServerErrorException;
}
declare class LoginError extends BaseError {
    constructor();
    readonly InvalidCredentials: (params?: Record<string, any>) => UnauthorizedException;
    readonly EmailNotConfirmed: (params?: Record<string, any>) => UnauthorizedException;
}
export declare class ConfirmEmailError extends BaseError {
    constructor();
    readonly InvalidConfirmationToken: (params?: Record<string, any>) => ConflictException;
    readonly ConfirmationTokenExpired: (params?: Record<string, any>) => ConflictException;
    readonly FailedToUpdateUser: (params?: Record<string, any>) => InternalServerErrorException;
}
export declare class ResendConfirmationEmailError extends BaseError {
    constructor();
    readonly UserDoesNotExist: (params?: Record<string, any>) => ConflictException;
    readonly EmailAlreadyConfirmed: (params?: Record<string, any>) => ConflictException;
    readonly FailedToUpdateUser: (params?: Record<string, any>) => InternalServerErrorException;
}
export declare const registerError: RegisterError;
export declare const loginError: LoginError;
export declare const confirmEmailError: ConfirmEmailError;
export declare const resendConfirmationEmailError: ResendConfirmationEmailError;
export {};
