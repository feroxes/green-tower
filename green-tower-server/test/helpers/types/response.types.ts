import { ListMetaType } from '@app-types/dto.types';

export type ErrorResponse = {
  errorCode: string;
  message: string;
};

export type GuardError = {
  statusCode: number;
  error: string;
  message: string;
};

export type LoginResponseType = {
  body: {
    accessToken: string;
  };
  headers: object;
};

export type ErrorResponseType = {
  body: ErrorResponse;
};

export type GuardErrorResponseType = {
  body: GuardError;
};

export type EmptyResponseType = {
  body: object;
  headers: object;
};

export type ObjectResponseType<T> = {
  body: T;
};

export type ListResponseType<T> = {
  body: {
    itemList: T[];
    meta: ListMetaType;
  };
};
