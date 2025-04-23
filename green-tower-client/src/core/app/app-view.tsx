import React, { lazy, useEffect } from 'react';
import { useLanguage, useLsi, useAuthentication } from '../../hooks/hooks';
import AppRouter from '../../routes/app-router';

const Authentication = lazy(() => import('../../routes/authentication'));

function AppView() {
  const lsi = useLsi();
  const { language } = useLanguage();
  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    document.title = lsi.greenTower;
  }, [language]);

  const notAuthenticatedRouteMap = {
    '/': <Authentication />,
  };

  const authenticatedRouteMap = {
    '/': <Authentication />,
  };

  return <AppRouter routerMap={isAuthenticated ? authenticatedRouteMap : notAuthenticatedRouteMap} />;
}

export default AppView;
