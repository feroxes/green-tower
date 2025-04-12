import { HttpException } from '@nestjs/common';

export interface ErrorResponse {
  errorCode: string;
  message: string;
  params?: Record<string, any>;
}

export abstract class BaseError {
  protected constructor(protected readonly code: string) {}

  protected createError<T extends HttpException>(
    ExceptionClass: new (response: ErrorResponse) => T,
    errorKey: string,
    message: string,
  ) {
    return (params: Record<string, any> = {}): T => {
      return new ExceptionClass({
        errorCode: `${this.code}${errorKey}`,
        message,
        params,
      });
    };
  }
}
