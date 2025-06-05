import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { FormEventHandler } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { ComponentWrapper, FormHeader, FormWrapper } from '../authentication.styles';
import { RegisterWrapper } from './login.styles';

import FormElements from '../../../components/form-elements/form-elements';

import { useLsi } from '../../../hooks/hooks';

import { Constants } from '../../../utils/constants';
import { Lsi } from './lsi';

export interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginFormViewProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  errors: FieldErrors<LoginFormInputs>;
  register: UseFormRegister<LoginFormInputs>;
  isPending: boolean;
  onSwitch: () => void;
}

function LoginFormView({ errors, onSubmit, register, isPending, onSwitch }: LoginFormViewProps) {
  const lsi = useLsi(Lsi);
  const commonLsi = useLsi();

  return (
    <ComponentWrapper>
      <FormHeader variant="h4">{commonLsi.login}</FormHeader>
      <FormWrapper>
        <form onSubmit={onSubmit}>
          <FormElements.Email
            error={Boolean(errors.email)}
            helperText={errors.email?.message ?? ''}
            disabled={isPending}
            {...register('email')}
          />

          <FormElements.Password
            error={Boolean(errors.password)}
            helperText={errors.password?.message ?? ''}
            disabled={isPending}
            {...register('password')}
          />

          <FormElements.Button loading={isPending} type="submit" style={{ marginTop: 8 }}>
            {commonLsi.login}
          </FormElements.Button>
        </form>

        <RegisterWrapper direction="row">
          <Typography variant="body2">{lsi.dontHaveAccount}</Typography>
          {Constants.space}
          <Typography variant="body2">
            <Link onClick={onSwitch} sx={{ cursor: 'pointer' }}>
              {lsi.register}
            </Link>
          </Typography>
        </RegisterWrapper>
      </FormWrapper>
    </ComponentWrapper>
  );
}

export default LoginFormView;
