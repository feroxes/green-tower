import { Dispatch, JSX, SetStateAction } from 'react';

import { FormContainer, PageWrapper } from './authentication-page-wrapper.styles';

import Logo from '../../components/logo/logo';

import { Config } from '../../config/config';
import { ActionType } from '../../core/authentication/authentication';
import Footer from '../../core/authentication/footer';

interface AuthenticationPageWrapperProps {
  children: JSX.Element;
  action?: ActionType;
  setAction?: Dispatch<SetStateAction<ActionType>>;
}

function AuthenticationPageWrapper({ children, action, setAction }: AuthenticationPageWrapperProps) {
  return (
    <PageWrapper>
      <Logo displayText textPosition="bottom" />
      <FormContainer
        sx={{
          p: 3,
          bgcolor: Config.colors.light,
          minHeight: action === 'login' ? '420px' : '480px',
        }}
      >
        {children}
        <Footer setAction={setAction} action={action} />
      </FormContainer>
    </PageWrapper>
  );
}

export default AuthenticationPageWrapper;
