import { ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { BaseError } from './base.error';
declare class UserCreateError extends BaseError {
    constructor();
    readonly FailedToSendConfirmationEmail: (params?: Record<string, any>) => InternalServerErrorException;
}
declare class UserUpdateError extends BaseError {
    constructor();
    readonly UserUpdateForbidden: (params?: Record<string, any>) => ForbiddenException;
    readonly FailedToUpdateUser: (params?: Record<string, any>) => InternalServerErrorException;
}
declare class UserGetError extends BaseError {
    constructor();
    readonly UserGetForbidden: (params?: Record<string, any>) => ForbiddenException;
}
declare class UserDeleteError extends BaseError {
    constructor();
    readonly OwnerCouldNotBeDeleted: (params?: Record<string, any>) => ForbiddenException;
    readonly FailedToDeleteUser: (params?: Record<string, any>) => InternalServerErrorException;
}
declare class UserSetRoleError extends BaseError {
    constructor();
    readonly OwnerCouldNotBeUpdated: (params?: Record<string, any>) => ForbiddenException;
    readonly FailedToSetUserRole: (params?: Record<string, any>) => InternalServerErrorException;
}
export declare const userCreateError: UserCreateError;
export declare const userUpdateError: UserUpdateError;
export declare const userGetError: UserGetError;
export declare const userDeleteError: UserDeleteError;
export declare const userSetRoleError: UserSetRoleError;
export {};
