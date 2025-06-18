import { JSX, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Fallback from '../components/fallback/fallback';
import Layout from '../components/layout/layout';

type AppRoutesPropsType = {
  routerMap: { [path: string]: JSX.Element };
  isAuthenticated: boolean;
};

const AppRoutes = ({ routerMap, isAuthenticated }: AppRoutesPropsType) => {
  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <Routes>
          {Object.keys(routerMap).map((path, key) => {
            if (isAuthenticated) {
              return <Route path={path} key={key} element={<Layout>{routerMap[path]}</Layout>} />;
            } else {
              return <Route path={path} key={key} element={routerMap[path]} />;
            }
          })}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
