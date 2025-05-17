import DataStateResolver from '../components/data-state-resolver/data-state-resolver';

import { useOwner } from '../hooks/user/use-user';

import Dashboard from '../core/dashboard/dashboard';
import { UserDto } from '../types/user-types';

function DashboardRoute() {
  const { query } = useOwner();

  return (
    <DataStateResolver query={query}>
      {({ data }) => {
        return <Dashboard userDataObject={data as UserDto} />;
      }}
    </DataStateResolver>
  );
}

export default DashboardRoute;
