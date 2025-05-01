import { styled, keyframes } from '@mui/material';
import Box from '@mui/material/Box';
import Logo from '../logo/logo';

const RADIUS = 0;
const ORBIT_RADIUS = 0;
const DURATION = '4s';

const orbit = keyframes`
  to {
    transform: rotate(360deg) translateX(${RADIUS}px);
  }
`;

export const OrbitContainer = styled(Box)({
  position: 'relative',
  '--orbit-radius': '100px',
  width: '100vw',
  height: '100vh',
});

export const OrbitingLogo = styled(Logo, {
  shouldForwardProp: (prop) => prop !== 'orbitRadius' && prop !== 'duration',
})<{
  orbitRadius?: number;
  duration?: string;
}>(({ orbitRadius = ORBIT_RADIUS, duration = DURATION }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  marginInline: 'auto',
  width: 'fit-content',
  '--orbit-radius': `${orbitRadius}px`,
  transform: 'rotate(0deg) translateX(var(--orbit-radius))',
  animation: `${orbit} ${duration} linear infinite`,
}));
