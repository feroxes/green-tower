import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useLogin,useLsi  } from '../../../hooks/hooks';

import { ValidationLsi } from '../../../lsi/validation-lsi';
import LoginFormView, { LoginFormInputs } from './login-form-view';
import { getLoginSchema } from './validation/login.schema';

interface LoginProps {
  onSwitch: () => void;
}

function Login({ onSwitch }: LoginProps) {
  const { mutate: login, isPending } = useLogin();
  const validationLsi = useLsi(ValidationLsi);
  const validationSchema = getLoginSchema(validationLsi);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(validationSchema) });

  async function onSubmit(data: LoginFormInputs, _?: React.BaseSyntheticEvent) {
    return login(data);
  }

  return (
    <LoginFormView
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
      register={register}
      isPending={isPending}
      onSwitch={onSwitch}
    />
  );
}

export default Login;
