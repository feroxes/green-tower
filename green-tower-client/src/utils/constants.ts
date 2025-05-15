import { SupportedLanguages } from '../types/types';

export const Constants = {
  space: '\u00A0',
  lsi: {
    defaultLanguage: SupportedLanguages.EN,
    supportedLanguages: [SupportedLanguages.EN, SupportedLanguages.UK],
  },
  localStorage: {
    language: 'language',
  },
  errorCodes: {
    Auth: {
      emailNotConfirmed: 'auth/login/emailNotConfirmed',
    },
  },
};
