import DashboardIcon from '@mui/icons-material/Dashboard';
import GrassIcon from '@mui/icons-material/Grass';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SpaIcon from '@mui/icons-material/Spa';

import { Path } from '../../types/types';
import Elements from '../elements/elements';

interface SidebarItemProps {
  color: string;
  bgcolor?: string | undefined;
  path: Path;
}

const routeIconMap = {
  '/': DashboardIcon,
  '/plants': SpaIcon,
  '/plantings': GrassIcon,
  '/orders': ShoppingCartIcon,
  '/customers': PeopleIcon,
  '/settings': SettingsIcon,
};
function SidebarItemIcon({ color, bgcolor, path }: SidebarItemProps) {
  const Component = routeIconMap[path];
  return (
    <Elements.Card bgcolor={bgcolor}>
      <Component sx={{ color }} />
    </Elements.Card>
  );
}

export default SidebarItemIcon;
