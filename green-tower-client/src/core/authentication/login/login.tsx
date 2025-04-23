import { useLsi } from '../../../hooks/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoginFormView, { LoginFormInputs } from './login-form-view';
import { ValidationLsi } from '../../../lsi/validation-lsi';

function Login() {
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

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log('----->data<-----', data);
  };

  return <LoginFormView onSubmit={handleSubmit(onSubmit)} errors={errors} register={register} />;
}

export default Login;
