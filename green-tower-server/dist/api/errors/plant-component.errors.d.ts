import { NotFoundException } from '@nestjs/common';
import { BaseError } from './base.error';
export declare class PlantComponentError extends BaseError {
    constructor(code: string);
    readonly PlantNotFound: (params?: Record<string, any>) => NotFoundException;
}
