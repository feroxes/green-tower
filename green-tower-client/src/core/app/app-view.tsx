import React, { lazy, useEffect } from 'react';
import { useLsi, useAuthentication } from '../../hooks/hooks';
import AppRouter from '../../routes/app-router';

const Authentication = lazy(() => import('../../routes/authentication'));
const Dashboard = lazy(() => import('../../routes/dashboard'));
const RegistrationConfirmation = lazy(() => import('../../routes/registration-confirmation'));

function AppView() {
  const lsi = useLsi();
  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    document.title = lsi.greenTower;
  }, [lsi]);

  const commonRoutes = {
    '/registrationConfirmation': <RegistrationConfirmation />,
  };

  const notAuthenticatedRouteMap = {
    '/': <Authentication />,
    ...commonRoutes,
  };

  const authenticatedRouteMap = {
    '/': <Dashboard />,
    ...commonRoutes,
  };

  return <AppRouter routerMap={isAuthenticated ? authenticatedRouteMap : notAuthenticatedRouteMap} />;
}

export default AppView;
