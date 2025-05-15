export interface ValidationLsiType {
  required: string;
  emailFormat: string;
  minLength: (n: number) => string;
  maxLength: (n: number) => string;
  passwordsMatch: string;
}

export const ValidationLsi = {
  required: {
    en: 'This field is required.',
    uk: "Це поле є обов'язковим.",
  },
  emailFormat: {
    en: 'Wrong format for email.',
    uk: 'Невірний формат для поштової адреси.',
  },
  minLength: (length: number) => {
    return {
      en: `This field must be at least ${length} characters`,
      uk: `Це поле має містити не менше ${length} символів`,
    };
  },
  maxLength: (length: number) => {
    return {
      en: `This field must contain no more then ${length} characters`,
      uk: `Це поле має містити не більше ${length} символів`,
    };
  },
  passwordsMatch: { en: 'Passwords must match', uk: 'Паролі повинні співпадати' },
};
