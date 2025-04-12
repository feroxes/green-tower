import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { BaseError } from './base.error';
export declare class FarmGetError extends BaseError {
    constructor();
    readonly FarmNotFound: (params?: Record<string, any>) => NotFoundException;
    readonly Forbidden: (params?: Record<string, any>) => ForbiddenException;
}
export declare const getError: FarmGetError;
