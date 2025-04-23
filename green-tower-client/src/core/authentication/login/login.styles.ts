import { styled } from '@mui/material/styles';
import { Config } from '../../../config/config';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export const ComponentWrapper = styled(Stack)`
  height: 100%;
`;

export const FormWrapper = styled(Box)`
  height: 100%;
`;

export const LoginHeader = styled(Typography)`
  color: ${Config.colors.brown};
  font-weight: bold;
  text-align: center;
  padding: 16px 0;
`;

export const LoginButton = styled(Button)`
  width: 100%;
`;

export const ForgotPasswordLink = styled(Link)`
  text-align: right;
  display: block;
  font-size: 14px;
  font-weight: bold;
`;

export const RegisterWrapper = styled(Stack)`
  margin-top: 12px;
  align-items: center;
  justify-content: center;
`;

export const FooterWrapper = styled(Stack)`
  align-items: center;
  justify-content: space-between;
`;
