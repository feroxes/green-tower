import { Dispatch, JSX, SetStateAction } from 'react';
import Logo from '../../components/logo/logo';
import Footer from '../../core/authentication/footer';
import { PageWrapper, FormContainer } from './authentication-page-wrapper.styles';
import { ActionType } from '../../core/authentication/authentication';

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
          bgcolor: 'background.default',
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
