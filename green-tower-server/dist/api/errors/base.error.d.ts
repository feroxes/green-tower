import { HttpException } from '@nestjs/common';
export interface ErrorResponse {
    errorCode: string;
    message: string;
    params?: Record<string, any>;
}
export declare abstract class BaseError {
    protected readonly code: string;
    protected constructor(code: string);
    protected createError<T extends HttpException>(ExceptionClass: new (response: ErrorResponse) => T, errorKey: string, message: string): (params?: Record<string, any>) => T;
}
