import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { Config } from '../../config/config';

export const ComponentWrapper = styled(Stack)`
  justify-content: center;
  align-items: center;
`;

export const LogoWrapper = styled(Box)<{ size: number }>`
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  background-image: url("${Config.s3AssetsBucketBaseUri}/logo.webp");
  background-size: cover;
  background-repeat: no-repeat;
`;
