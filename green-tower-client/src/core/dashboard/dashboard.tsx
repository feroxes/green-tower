import { JSX } from 'react';

import TopBar from '../../components/top-bar/tob-bar';

import { UserDto } from '../../types/user-types';

interface DashboardProps {
  userDataObject: UserDto;
}

function Dashboard({ userDataObject }: DashboardProps): JSX.Element {
  return (
    <div>
      <TopBar />
    </div>
  );
}

export default Dashboard;
