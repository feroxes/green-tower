import Box from '@mui/material/Box';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  bgcolor?: string;
}

function Card({ children, bgcolor = '#fff7da' }: CardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor,
        p: 0.6,
        borderRadius: 3,
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </Box>
  );
}

export default Card;
