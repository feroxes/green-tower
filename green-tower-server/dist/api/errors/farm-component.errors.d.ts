import { NotFoundException } from '@nestjs/common';
import { BaseError } from './base.error';
export declare class FarmGetComponentError extends BaseError {
    constructor(code: string);
    readonly FarmNotFound: (params?: Record<string, any>) => NotFoundException;
}
