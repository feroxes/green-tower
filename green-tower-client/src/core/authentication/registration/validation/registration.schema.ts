import * as yup from 'yup';

import { useLsi } from '../../../../hooks/common/use-lsi';

import { ValidationLsi, ValidationLsiType } from '../../../../lsi/validation-lsi';

export function getRegistrationSchema() {
  const validationLsi = useLsi(ValidationLsi);
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
      confirmPassword: yup
        .string()
        .required(validationLsi.required)
        .oneOf([yup.ref('password')], validationLsi.passwordsMatch)
        .min(8, validationLsi.minLength(8))
        .max(20, validationLsi.maxLength(20)),
      firstName: yup
        .string()
        .required(validationLsi.required)
        .min(2, validationLsi.minLength(2))
        .max(40, validationLsi.maxLength(40)),
      lastName: yup
        .string()
        .required(validationLsi.required)
        .min(2, validationLsi.minLength(2))
        .max(40, validationLsi.maxLength(40)),
      farmName: yup
        .string()
        .required(validationLsi.required)
        .min(2, validationLsi.minLength(2))
        .max(50, validationLsi.maxLength(50)),
    })
    .required();
}
