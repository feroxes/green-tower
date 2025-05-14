import React from 'react';
import { useLsi } from '../../../hooks/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginFormView, { LoginFormInputs } from './login-form-view';
import { getLoginSchema } from './validation/login.schema';
import { ValidationLsi } from '../../../lsi/validation-lsi';
import { useLogin } from '../../../hooks/hooks';

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
