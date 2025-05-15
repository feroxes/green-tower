import { JSX, useState } from 'react';
import Login from './login/login';
import Registration from './registration/registration';
import RegistrationCompletedView from './registration/registration-completed-view';
import AuthenticationPageWrapper from '../../components/authentication-page-wrapper/authentication-page-wrapper';

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
    <AuthenticationPageWrapper action={action} setAction={setAction}>
      {getComponent()}
    </AuthenticationPageWrapper>
  );
}

export default Authentication;
