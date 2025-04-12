import { InternalServerErrorException } from '@nestjs/common';
import { BaseError } from './base.error';
declare class PlantCreateError extends BaseError {
    constructor();
    readonly FailedToCreatePlant: (params?: Record<string, any>) => InternalServerErrorException;
}
declare class PlantUpdateError extends BaseError {
    constructor();
    readonly FailedToUpdatePlant: (params?: Record<string, any>) => InternalServerErrorException;
}
declare class PlantDeleteError extends BaseError {
    constructor();
    readonly FailedToDeletePlant: (params?: Record<string, any>) => InternalServerErrorException;
}
export declare const plantCreateError: PlantCreateError;
export declare const plantUpdateError: PlantUpdateError;
export declare const plantDeleteError: PlantDeleteError;
export {};
