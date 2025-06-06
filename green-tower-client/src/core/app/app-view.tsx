import React, { lazy, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthentication, useLsi } from '../../hooks/hooks';

import AppRouter from '../../routes/app-router';

const Authentication = lazy(() => import('../../routes/authentication'));
const Plants = lazy(() => import('../../routes/plants'));
const Plantings = lazy(() => import('../../routes/plantings'));
const Orders = lazy(() => import('../../routes/orders'));
const Clients = lazy(() => import('../../routes/clients'));
const Settings = lazy(() => import('../../routes/settings'));
const Dashboard = lazy(() => import('../../routes/dashboard'));
const RegistrationConfirmation = lazy(() => import('../../routes/registration-confirmation'));

function AppView() {
  const lsi = useLsi();
  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    document.title = lsi.greenTower;
  }, [lsi]);

  const commonRoutes = {
    '*': <Navigate to="/" replace />,
    '/registrationConfirmation': <RegistrationConfirmation />,
  };

  const notAuthenticatedRouteMap = {
    '/': <Authentication />,
    ...commonRoutes,
  };

  const authenticatedRouteMap = {
    '/': <Dashboard />,
    '/plants': <Plants />,
    '/plantings': <Plantings />,
    '/orders': <Orders />,
    '/clients': <Clients />,
    '/settings': <Settings />,
    ...commonRoutes,
  };

  return (
    <AppRouter
      isAuthenticated={isAuthenticated}
      routerMap={isAuthenticated ? authenticatedRouteMap : notAuthenticatedRouteMap}
    />
  );
}

export default AppView;
