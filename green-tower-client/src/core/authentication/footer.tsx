import { Dispatch, SetStateAction } from 'react';
import { FooterWrapper, FooterLink } from './authentication.styles';
import { useLsi } from '../../hooks/common/use-lsi';
import { Lsi } from './lsi';
import LanguageSelector from '../../components/language-selector/language-selector';
import { ActionType } from './authentication';

interface FooterProps {
  setAction: Dispatch<SetStateAction<ActionType>>;
  action: ActionType;
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
    setAction(actionHandlerMap[action] as ActionType);
  }

  function getActionLsi() {
    const lsiKey = actionLsiMap[action];
    return lsi[lsiKey];
  }

  return (
    <FooterWrapper direction="row" sx={{ mt: 3 }}>
      <LanguageSelector />
      {action ? <FooterLink onClick={handleOnAction}>{getActionLsi()}</FooterLink> : ' '}
    </FooterWrapper>
  );
}

export default Footer;
