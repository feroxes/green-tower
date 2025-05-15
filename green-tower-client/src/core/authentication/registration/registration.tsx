import { yupResolver } from '@hookform/resolvers/yup';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import { useRegistration } from '../../../hooks/auth/useRegistration';
import { useLsi } from '../../../hooks/common/use-lsi';
import { useLanguage } from '../../../hooks/hooks';

import { ValidationLsi } from '../../../lsi/validation-lsi';
import RegistrationFormView, { RegistrationFormInputs } from './registration-form-view';
import { getRegistrationSchema } from './validation/registration.schema';

interface RegistrationProps {
  setRegistrationEmail: Dispatch<SetStateAction<string>>;
  onSwitch: () => void;
}

function Registration({ setRegistrationEmail, onSwitch }: RegistrationProps) {
  const { mutate: signup, isPending } = useRegistration(onSwitch);
  const validationLsi = useLsi(ValidationLsi);
  const validationSchema = getRegistrationSchema(validationLsi);
  const { language } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>({ resolver: yupResolver(validationSchema) });

  async function onSubmit(data: RegistrationFormInputs, _?: React.BaseSyntheticEvent) {
    signup({ ...data, language });
    setRegistrationEmail(data.email);
  }

  return (
    <RegistrationFormView register={register} errors={errors} onSubmit={handleSubmit(onSubmit)} isPending={isPending} />
  );
}

export default Registration;
