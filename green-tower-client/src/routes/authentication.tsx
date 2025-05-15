import BackgroundProvider from '../components/background-provider/background-provider';

import Authentication from '../core/authentication/authentication';

function AuthenticationRoute() {
  return (
    <BackgroundProvider>
      <Authentication />
    </BackgroundProvider>
  );
}

export default AuthenticationRoute;
