import * as yup from 'yup';

import type { ValidationLsiType } from '../../../../lsi/validation-lsi';

export function getLoginSchema(validationLsi: ValidationLsiType) {
  return yup
    .object({
      email: yup
        .string()
        .email(validationLsi.emailFormat)
        .required(validationLsi.required)
        .max(40, validationLsi.maxLength(40)),
      password: yup
        .string()
        .required(validationLsi.required)
        .min(8, validationLsi.minLength(8))
        .max(20, validationLsi.maxLength(20)),
    })
    .required();
}
