import { FormEventHandler } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { useLsi } from '../../../hooks/hooks';
import FormElements from '../../../components/form-elements/form-elements';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Constants } from '../../../utils/constants';
import { Lsi } from './lsi';
import { RegisterWrapper } from './login.styles';
import { ComponentWrapper, FormHeader, FormWrapper } from '../authentication.styles';

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
      <FormHeader variant="h5">{commonLsi.login}</FormHeader>
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

          <Button
            loading={isPending}
            type="submit"
            variant="contained"
            color="success"
            size="large"
            fullWidth
            sx={{ mt: 1 }}
          >
            {commonLsi.login}
          </Button>
        </form>

        <RegisterWrapper direction="row">
          <Typography>{lsi.dontHaveAccount}</Typography>
          {Constants.space}
          <Link onClick={onSwitch} sx={{ cursor: 'pointer' }}>
            {lsi.register}
          </Link>
        </RegisterWrapper>
      </FormWrapper>
    </ComponentWrapper>
  );
}

export default LoginFormView;
