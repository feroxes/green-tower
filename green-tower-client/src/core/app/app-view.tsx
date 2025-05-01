import React, { lazy, useEffect } from 'react';
import { useLsi, useAuthentication } from '../../hooks/hooks';
import AppRouter from '../../routes/app-router';

const Authentication = lazy(() => import('../../routes/authentication'));
const Dashboard = lazy(() => import('../../routes/dashboard'));

function AppView() {
  const lsi = useLsi();
  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    document.title = lsi.greenTower;
  }, [lsi]);

  const notAuthenticatedRouteMap = {
    '/': <Authentication />,
  };

  const authenticatedRouteMap = {
    '/': <Dashboard />,
  };

  return <AppRouter routerMap={isAuthenticated ? authenticatedRouteMap : notAuthenticatedRouteMap} />;
}

export default AppView;
