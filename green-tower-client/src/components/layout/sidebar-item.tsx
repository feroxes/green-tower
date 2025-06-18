import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useLsi } from '../../hooks/common/use-lsi';

import { Config } from '../../config/config';
import { Path } from '../../types/types';
import SidebarItemIcon from './sidebar-item-icon';

interface SidebarItemProps {
  label: string;
  path: Path;
  isActive: boolean;
  isOpen: boolean;
  onClick: () => void;
}

function SidebarItem({ path, label, isActive, isOpen, onClick }: SidebarItemProps) {
  const lsi = useLsi();
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        bgcolor: isActive && isOpen ? '#cce8a4' : 'transparent',
        border: `1px solid ${isActive && isOpen ? '#afde7e' : 'transparent'}`,
        color: Config.colors.brown,
        borderRadius: 4,
        mx: 1,
        py: 1,
        px: isOpen ? 1.25 : 1,
        display: 'flex',
        alignItems: 'center',
        transition: 'background 0.3s',
        gap: 2,
        '&:hover': {
          bgcolor: '#cce8a4',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 32 }}>
        <SidebarItemIcon
          path={path}
          color={isActive ? Config.colors.sand : Config.colors.green}
          bgcolor={isActive ? Config.colors.green : Config.colors.sand}
        />
      </Box>
      {isOpen && (
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {lsi[label]}
        </Typography>
      )}
    </Box>
  );
}

export default SidebarItem;
