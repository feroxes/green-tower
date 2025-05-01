import { JSX, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Fallback from '../components/fallback/fallback';

type AppRoutesPropsType = {
  routerMap: { [path: string]: JSX.Element };
};

const AppRoutes = ({ routerMap }: AppRoutesPropsType) => {
  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <Routes>
          {Object.keys(routerMap).map((path, key) => {
            return <Route path={path} key={key} element={routerMap[path]} />;
          })}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
