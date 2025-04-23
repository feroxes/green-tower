import { useState } from 'react';
import Login from './login/login';
import RegistrationForm from './registration/registration-form';
import Logo from '../../components/logo/logo';
import { AuthenticationWrapper, FormWrapper } from './authentication.styles';

function Authentication() {
  const [action, setAction] = useState<'login' | 'registration'>('login');

  return (
    <AuthenticationWrapper>
      <Logo displayText textPosition="bottom" />
      <FormWrapper sx={{ bgcolor: 'background.default' }}>
        {action === 'login' ? <Login /> : <RegistrationForm />}
      </FormWrapper>
    </AuthenticationWrapper>
  );
}

export default Authentication;
