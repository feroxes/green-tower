import { JSX } from 'react';

import { UserDto } from '../../types/user-types';

interface DashboardProps {
  userDataObject: UserDto;
}

function Dashboard({ userDataObject }: DashboardProps): JSX.Element {
  return <div>Dashboard</div>;
}

export default Dashboard;
