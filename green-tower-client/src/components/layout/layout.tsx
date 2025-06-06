import Box from '@mui/material/Box';
import { ReactNode, useState } from 'react';

import Sidebar from './sidebar';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const sidebarOpen = localStorage.getItem('sidebarOpen');
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarOpen ? sidebarOpen === 'true' : true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      localStorage.setItem('sidebarOpen', String(!prev));
      return !prev;
    });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
      <Box sx={{ flex: 1, overflowY: 'auto', height: '100vh', backgroundColor: '#fffbe6' }}>{children}</Box>
    </Box>
  );
}

export default Layout;
