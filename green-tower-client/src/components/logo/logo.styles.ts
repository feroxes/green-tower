import { styled } from '@mui/material/styles';
import greenTowerLogo from '../../assets/logo.png';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export const ComponentWrapper = styled(Stack)`
  justify-content: center;
  align-items: center;
`;

export const LogoWrapper = styled(Box)<{ size: number }>`
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  background-image: url(${greenTowerLogo});
  background-size: cover;
  background-repeat: no-repeat;
`;
