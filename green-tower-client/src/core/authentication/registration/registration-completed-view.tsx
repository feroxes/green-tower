import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ButtonWithTimer from '../../../components/button-with-timer/button-with-timer';
import PlaceholderBox from '../../../components/placeholder-box/placeholder-box';

import { useAlert, useLanguage, useLsi } from '../../../hooks/hooks';

import Calls from '../../../services/calls';
import { Constants } from '../../../utils/constants';
import { Lsi } from './lsi';

interface RegistrationCompletedViewProps {
  registrationEmail: string;
}

function RegistrationCompletedView({ registrationEmail }: RegistrationCompletedViewProps) {
  const lsi = useLsi(Lsi);
  const { language } = useLanguage();
  const { addAlert } = useAlert();

  async function handleOnResendEmailClick() {
    try {
      await Calls.Auth.resendConfirmationEmail({ email: registrationEmail, language });
      addAlert(lsi.resendSuccessfully);
    } catch (e: unknown) {
      if (e instanceof Error) {
        addAlert(e.message, 'error');
      }
    }
  }
  function getSubHeader() {
    return (
      <>
        {lsi.weSentAnEmail}
        {Constants.space}
        <b>{registrationEmail}.</b>
      </>
    );
  }

  return (
    <Stack sx={{ height: '100%' }}>
      <PlaceholderBox code="email" header={lsi.checkYourEmail} subHeader={getSubHeader()} />
      <Stack sx={{ textAlign: 'center' }}>
        <br />
        <Typography variant="body2">{lsi.clickTheLink}</Typography>
        <br />
        <Typography variant="body2">{lsi.checkSpam}</Typography>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <ButtonWithTimer content={lsi.resend} onClick={handleOnResendEmailClick} />
      </Box>
    </Stack>
  );
}

export default RegistrationCompletedView;
