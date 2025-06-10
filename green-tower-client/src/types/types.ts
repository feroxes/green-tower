export enum SupportedLanguages {
  UK = 'uk',
  EN = 'en',
}

export interface ErrorResponse {
  errorCode: string;
  message?: string;
}

export type UserRoles = 'owner' | 'admin' | 'user';

export type Path = '/' | '/plants' | '/plantings' | '/orders' | '/clients' | '/settings';

export type MetaType = {
  page: number;
  size: number;
  total: number;
};
