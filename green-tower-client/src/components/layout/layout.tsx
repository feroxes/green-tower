import Box from '@mui/material/Box';
import { ReactNode, useEffect, useState } from 'react';

import { useDevice } from '../../hooks/common/use-device';

import Sidebar from './sidebar';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isMobile } = useDevice();
  const sidebarOpen = localStorage.getItem('sidebarOpen');
  const [isSidebarOpen, setIsSidebarOpen] = useState(getSidebarValue());

  useEffect(() => {
    if (isMobile) {
      localStorage.setItem('sidebarOpen', String(false));
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  function getSidebarValue() {
    if (isMobile) return false;
    return sidebarOpen ? sidebarOpen === 'true' : true;
  }

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      localStorage.setItem('sidebarOpen', String(!prev));
      return !prev;
    });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
      <Box sx={{ flex: 1, overflowY: 'auto', height: '100vh', backgroundColor: '#fffbe6', p: { xs: 2, sm: 2, md: 3 } }}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
