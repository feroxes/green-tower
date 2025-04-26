import React, { useState } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { useLsi } from '../../../hooks/hooks';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Constants } from '../../../helpers/constants';
import { Lsi } from './lsi';
import LanguageSelector from '../../../components/language-selector/language-selector';
import {
  ComponentWrapper,
  FormWrapper,
  LoginHeader,
  LoginButton,
  ForgotPasswordLink,
  RegisterWrapper,
  FooterWrapper,
} from './login.styles';
import { useAlert } from '../../../hooks/hooks';

export interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginFormViewProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  errors: FieldErrors<LoginFormInputs>;
  register: UseFormRegister<LoginFormInputs>;
}

function LoginFormView({ errors, onSubmit, register }: LoginFormViewProps) {
  const alert = useAlert();
  const lsi = useLsi(Lsi);
  const commonLsi = useLsi();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ComponentWrapper>
      <LoginHeader variant="h5">{commonLsi.login}</LoginHeader>
      <FormWrapper>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            margin="dense"
            size="small"
            autoComplete="email"
            label={commonLsi.email}
            error={Boolean(errors.email)}
            helperText={errors.email?.message ?? ''}
            {...register('email')}
          />

          <TextField
            fullWidth
            margin="dense"
            size="small"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            label={commonLsi.password}
            error={Boolean(errors.password)}
            helperText={errors.password?.message ?? ''}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end" size="small">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            {...register('password')}
          />

          <LoginButton type="submit" variant="contained" color="success" size="large" sx={{ mt: 1 }}>
            {commonLsi.login}
          </LoginButton>
        </form>

        <RegisterWrapper direction="row">
          <Typography>{lsi.dontHaveAccount}</Typography>
          {Constants.space}
          <Link>{lsi.register}</Link>
        </RegisterWrapper>
      </FormWrapper>

      <FooterWrapper direction="row">
        <LanguageSelector />
        <ForgotPasswordLink>{lsi.forgotPassword}</ForgotPasswordLink>
      </FooterWrapper>
    </ComponentWrapper>
  );
}

export default LoginFormView;
