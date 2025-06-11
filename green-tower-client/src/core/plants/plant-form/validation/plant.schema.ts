import * as yup from 'yup';

import { useLsi } from '../../../../hooks/hooks';

import { ValidationLsi } from '../../../../lsi/validation-lsi';
import { PlantType } from '../../../../types/plants-types';

export const getPlantSchema = () => {
  const validationLsi = useLsi(ValidationLsi);

  const optionalNumber = (min?: number) =>
    yup
      .number()
      .transform((value, originalValue) => (originalValue === '' || originalValue == null ? undefined : value))
      .nullable()
      .optional()
      .when([], {
        is: (v: any) => v != null,
        then: (schema) => (min ? schema.min(min, validationLsi.min(min)) : schema),
      });

  return yup
    .object({
      name: yup
        .string()
        .min(3, validationLsi.minLength(3))
        .max(120, validationLsi.maxLength(120))
        .required(validationLsi.required),
      description: yup.string().nullable().optional(),
      notes: yup.string().max(2024, validationLsi.maxLength(2024)).nullable().optional(),
      imageUrl: yup
        .string()
        .min(3, validationLsi.minLength(3))
        .max(512, validationLsi.maxLength(512))
        .nullable()
        .optional(),
      type: yup.mixed<PlantType>().oneOf(Object.values(PlantType)).required(validationLsi.required),
      expectedHoursToHarvest: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' || originalValue == null ? undefined : value))
        .min(1, validationLsi.min(1))
        .required(validationLsi.required),
      hoursToSoak: optionalNumber(1),
      hoursToMoveToLight: optionalNumber(1),
      shouldBePressed: yup.boolean().nullable().optional(),
      seedsGramPerPlate: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' || originalValue == null ? undefined : value))
        .min(1, validationLsi.min(1))
        .required(validationLsi.required),
      expectedHarvestGramsPerPlate: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' || originalValue == null ? undefined : value))
        .min(1, validationLsi.min(1))
        .required(validationLsi.required),
      sellPricePerPlate: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' || originalValue == null ? undefined : value))
        .min(1, validationLsi.min(1))
        .required(validationLsi.required),
    })
    .required();
};
