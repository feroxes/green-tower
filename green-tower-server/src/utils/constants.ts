export const FarmConstants = {
  NAME_MAX_LENGTH: 50 as const,
};

export const AuthConstants = {
  EMAIL_CONFIRMATION_EXPIRES_HOURS: 24 as const,
  ACCESS_TOKEN_EXPIRATION: '15m' as const,
  REFRESH_TOKEN_EXPIRATION: '7d' as const,
};

export const ErrorCodes = {
  DB: {
    foreignKeyViolation: '23503',
  },
};
