import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import AuthenticationPageWrapper from '../components/authentication-page-wrapper/authentication-page-wrapper';
import BackgroundProvider from '../components/background-provider/background-provider';
import DataStateResolver from '../components/data-state-resolver/data-state-resolver';

import RegistrationConfirmation from '../core/registration-confirmation/registration-confirmation';
import Calls from '../services/calls';

function RegistrationConfirmationRoute() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') as string;

  const query = useQuery({
    queryKey: ['confirmEmail'],
    queryFn: () => Calls.Auth.confirmEmail(token),
  });

  return (
    <BackgroundProvider>
      <AuthenticationPageWrapper>
        <DataStateResolver query={query}>{(query) => <RegistrationConfirmation query={query} />}</DataStateResolver>
      </AuthenticationPageWrapper>
    </BackgroundProvider>
  );
}

export default RegistrationConfirmationRoute;
