import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Config } from '../../config/config';

export const ComponentWrapper = styled(Stack)`
  height: 100%;
`;

export const FormWrapper = styled(Box)`
  height: 100%;
`;

export const FormHeader = styled(Typography)`
  color: ${Config.colors.brown};
  font-weight: bold;
  text-align: center;
  padding: 0 0 16px;
`;

export const FooterWrapper = styled(Stack)`
  align-items: center;
  justify-content: space-between;
`;
