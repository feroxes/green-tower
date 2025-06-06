import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import FormElements from '../../components/form-elements/form-elements';
import PlaceholderBox from '../../components/placeholder-box/placeholder-box';

import { useLsi } from '../../hooks/hooks';

import { Config } from '../../config/config';
import { ErrorHelper } from '../../utils/error-helper';
import { Lsi } from './lsi';

interface RegistrationConfirmationProps {
  query: ReturnType<typeof useQuery>;
}

function RegistrationConfirmation({ query }: RegistrationConfirmationProps) {
  const commonLsi = useLsi();
  const lsi = useLsi(Lsi);
  const navigate = useNavigate();
  const { isError, error } = query;

  function handleOnLoginClick() {
    navigate('/', { replace: true });
  }

  function getErrorLsi() {
    const err = error as AxiosError<{ errorCode?: string }>;
    const lsiCode = ErrorHelper.getLsiCode(err);
    if (lsiCode && lsiCode in lsi) {
      return lsi[lsiCode as keyof typeof lsi];
    }
    return commonLsi.unexpectedError;
  }

  return (
    <Box sx={{ mt: 6 }}>
      <PlaceholderBox
        code={isError ? 'sadSmile' : 'smile'}
        color={isError ? '#bd2635' : Config.colors.lightGreen}
        bgColor={Config.colors.light}
        header={isError ? lsi.oops : lsi.thanks}
        subHeader={isError ? getErrorLsi() : lsi.accountCreated}
      />
      <FormElements.Button onClick={handleOnLoginClick} style={{ marginTop: '16px' }}>
        {commonLsi.login}
      </FormElements.Button>
    </Box>
  );
}

export default RegistrationConfirmation;
