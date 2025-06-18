import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDevice } from '../../hooks/common/use-device';

import { Path } from '../../types/types';
import Logo from '../logo/logo';
import SidebarItem from './sidebar-item';

const routes = [
  { path: '/', label: 'dashboard' },
  { path: '/plants', label: 'plants' },
  { path: '/plantings', label: 'planting' },
  { path: '/orders', label: 'orders' },
  { path: '/customers', label: 'customers' },
  { path: '/settings', label: 'settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { isMobile } = useDevice();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: isOpen ? 260 : 74,
        minWidth: isOpen ? 260 : 74,
        p: isOpen ? 2 : 1,
        height: '100vh',
        bgcolor: '#fef7da',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'width 0.3s ease',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottomRightRadius: '16px',
        borderTopRightRadius: '16px',
      }}
    >
      <Stack sx={{ width: '100%', alignItems: 'center', mt: 1, mb: isOpen ? 1 : 2 }}>
        <Logo
          logoSize={isOpen ? 64 : 36}
          fontSize={isOpen ? 28 : 0}
          displayText={isOpen}
          displayLogo
          textPosition="bottom"
        />
      </Stack>
      <Stack spacing={1} sx={{ width: isOpen ? '100%' : 'none', flex: 1 }}>
        {routes.map((route) => (
          <SidebarItem
            key={route.path}
            path={route.path as Path}
            label={route.label}
            isActive={location.pathname === route.path}
            isOpen={isOpen}
            onClick={() => navigate(route.path)}
          />
        ))}
      </Stack>
      {!isMobile && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: isOpen ? 'flex-end' : 'center', p: 1 }}>
          <IconButton onClick={onToggle} size="small">
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default Sidebar;
