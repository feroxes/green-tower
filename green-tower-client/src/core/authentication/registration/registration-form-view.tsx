import { ComponentWrapper, FormHeader, FormWrapper } from '../authentication.styles';
import { RegistrationSubHeader } from './registration.styles';
import { useLsi } from '../../../hooks/common/use-lsi';
import { Lsi } from './lsi';
import FormElements from '../../../components/form-elements/form-elements';
import Stack from '@mui/material/Stack';
import React from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import Button from '@mui/material/Button';

export interface RegistrationFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  farmName: string;
  firstName: string;
  lastName: string;
}

interface RegistrationFormViewProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  errors: FieldErrors<RegistrationFormInputs>;
  register: UseFormRegister<RegistrationFormInputs>;
  isPending: boolean;
}

function RegistrationFormView({ onSubmit, errors, register, isPending }: RegistrationFormViewProps) {
  const lsi = useLsi(Lsi);

  return (
    <ComponentWrapper>
      <FormHeader variant="h5">{lsi.registration}</FormHeader>
      <FormWrapper>
        <form onSubmit={onSubmit}>
          <RegistrationSubHeader>{lsi.farmInfo}</RegistrationSubHeader>
          <FormElements.Text
            error={Boolean(errors.farmName)}
            helperText={errors.farmName?.message ?? ''}
            label={lsi.farmName}
            disabled={isPending}
            {...register('farmName')}
          />
          <RegistrationSubHeader sx={{ mt: 1 }}>{lsi.userInfo}</RegistrationSubHeader>
          <Stack direction="row" spacing={2} sx={{ m: '8px 0 4px' }}>
            <FormElements.Text
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message ?? ''}
              label={lsi.firstName}
              fullWidth={false}
              disabled={isPending}
              {...register('firstName')}
            />
            <FormElements.Text
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message ?? ''}
              label={lsi.lastName}
              fullWidth={false}
              disabled={isPending}
              {...register('lastName')}
            />
          </Stack>
          <FormElements.Email
            disabled={isPending}
            error={Boolean(errors.email)}
            helperText={errors.email?.message ?? ''}
            {...register('email')}
          />

          <FormElements.Password
            disabled={isPending}
            error={Boolean(errors.password)}
            helperText={errors.password?.message ?? ''}
            {...register('password')}
          />
          <FormElements.Password
            disabled={isPending}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message ?? ''}
            confirm
            {...register('confirmPassword')}
          />
          <Button
            loading={isPending}
            type="submit"
            variant="contained"
            color="success"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            {lsi.registration}
          </Button>
        </form>
      </FormWrapper>
    </ComponentWrapper>
  );
}

export default RegistrationFormView;
