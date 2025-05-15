import PlaceholderBox from '../../components/placeholder-box/placeholder-box';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Lsi } from './lsi';
import { useNavigate } from 'react-router-dom';
import { useLsi } from '../../hooks/hooks';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { ErrorHelper } from '../../utils/error-helper';

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
        color={isError ? '#bd2635' : '#2e7d32'}
        bgColor="#fff"
        header={isError ? lsi.oops : lsi.thanks}
        subHeader={isError ? getErrorLsi() : lsi.accountCreated}
      />
      <Button variant="contained" size="large" fullWidth color="success" sx={{ mt: 4 }} onClick={handleOnLoginClick}>
        {commonLsi.login}
      </Button>
    </Box>
  );
}

export default RegistrationConfirmation;
