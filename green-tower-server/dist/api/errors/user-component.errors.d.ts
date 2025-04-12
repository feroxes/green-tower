import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BaseError } from './base.error';
export declare class UserCreateComponentError extends BaseError {
    constructor(code: string);
    readonly UserAlreadyExists: (params?: Record<string, any>) => ConflictException;
    readonly FailedToCreateUser: (params?: Record<string, any>) => InternalServerErrorException;
}
export declare class UserCheckExistenceComponentError extends BaseError {
    constructor(code: string);
    readonly UserNotFound: (params?: Record<string, any>) => NotFoundException;
}
