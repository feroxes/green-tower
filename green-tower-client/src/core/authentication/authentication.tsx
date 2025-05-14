import { JSX, useState } from 'react';
import Login from './login/login';
import Registration from './registration/registration';
import Logo from '../../components/logo/logo';
import Footer from './footer';
import { AuthenticationWrapper, FormContainer } from './authentication.styles';
import RegistrationCompletedView from './registration/registration-completed-view';

export type ActionType = 'login' | 'registration' | 'registrationCompleted';

function Authentication() {
  const [action, setAction] = useState<ActionType>('login');
  const [registrationEmail, setRegistrationEmail] = useState<string>('');

  function getComponent() {
    const componentsMap: Record<string, () => JSX.Element> = {
      login: () => <Login onSwitch={() => setAction('registration')} />,
      registration: () => (
        <Registration setRegistrationEmail={setRegistrationEmail} onSwitch={() => setAction('registrationCompleted')} />
      ),
      registrationCompleted: () => <RegistrationCompletedView registrationEmail={registrationEmail} />,
    };
    return componentsMap[action]();
  }

  return (
    <AuthenticationWrapper>
      <Logo displayText textPosition="bottom" />
      <FormContainer
        sx={{
          p: 3,
          bgcolor: 'background.default',
          minHeight: action === 'login' ? '420px' : '480px',
        }}
      >
        {getComponent()}
        <Footer setAction={setAction} action={action} />
      </FormContainer>
    </AuthenticationWrapper>
  );
}

export default Authentication;
