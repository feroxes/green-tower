import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Dispatch, SetStateAction } from 'react';

import { FooterWrapper } from './authentication.styles';

import LanguageSelector from '../../components/language-selector/language-selector';

import { useLsi } from '../../hooks/common/use-lsi';

import { ActionType } from './authentication';
import { Lsi } from './lsi';

interface FooterProps {
  setAction?: Dispatch<SetStateAction<ActionType>>;
  action?: ActionType;
}

const actionHandlerMap = {
  login: 'registration',
  registration: 'login',
  registrationCompleted: 'login',
};

const actionLsiMap: Record<ActionType, keyof typeof Lsi> = {
  login: 'forgotPassword',
  registration: 'backToLogin',
  registrationCompleted: 'backToLogin',
};

function Footer({ setAction, action }: FooterProps) {
  const lsi = useLsi(Lsi);

  function handleOnAction() {
    if (setAction && action) {
      setAction(actionHandlerMap[action] as ActionType);
    }
  }

  function getActionLsi() {
    if (action) {
      const lsiKey = actionLsiMap[action];
      return lsi[lsiKey];
    }
  }

  return (
    <FooterWrapper direction="row" sx={{ mt: 3 }}>
      <LanguageSelector />
      {action ? (
        <Typography variant="body2">
          <Link style={{ cursor: 'pointer' }} onClick={handleOnAction}>
            {getActionLsi()}
          </Link>
        </Typography>
      ) : (
        ' '
      )}
    </FooterWrapper>
  );
}

export default Footer;
