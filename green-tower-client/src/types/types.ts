export enum SupportedLanguages {
  UK = 'uk',
  EN = 'en',
}

export interface ErrorResponse {
  errorCode: string;
  message?: string;
}
