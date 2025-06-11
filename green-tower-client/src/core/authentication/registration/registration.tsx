import { yupResolver } from '@hookform/resolvers/yup';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import { useRegistration } from '../../../hooks/auth/use-registration';
import { useLanguage } from '../../../hooks/hooks';

import RegistrationFormView, { RegistrationFormInputs } from './registration-form-view';
import { getRegistrationSchema } from './validation/registration.schema';

interface RegistrationProps {
  setRegistrationEmail: Dispatch<SetStateAction<string>>;
  onSwitch: () => void;
}

function Registration({ setRegistrationEmail, onSwitch }: RegistrationProps) {
  const { mutate: signup, isPending } = useRegistration(onSwitch);
  const validationSchema = getRegistrationSchema();
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
