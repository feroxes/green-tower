import React from 'react';
import { useLsi } from '../../../hooks/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoginFormView, { LoginFormInputs } from './login-form-view';
import { ValidationLsi } from '../../../lsi/validation-lsi';
import { useAuthentication } from '../../../hooks/hooks';
import Calls from 'services/calls';

function Login() {
  const { login } = useAuthentication();
  const validationLsi = useLsi(ValidationLsi);

  const validationSchema = yup
    .object({
      email: yup.string().email(validationLsi.emailFormat).required(validationLsi.required),
      password: yup.string().required(validationLsi.required),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(validationSchema) });

  async function onSubmit(data: LoginFormInputs, event?: React.BaseSyntheticEvent) {
    await Calls.Auth.login(data)
      .then((result) => {
        login(result.data.accessToken);
      })
      .catch((error) => {
        console.log('----->error<-----', error);
      });
  }

  return <LoginFormView onSubmit={handleSubmit(onSubmit)} errors={errors} register={register} />;
}

export default Login;
