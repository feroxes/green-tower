import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Config } from '../../config/config';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export const AuthenticationWrapper = styled(Stack)`
  height: calc(100vh - 42px);
  align-items: center;
  padding-top: 42px;
`;

export const ComponentWrapper = styled(Stack)`
  height: 100%;
`;

export const FormContainer = styled(Stack)`
  width: 340px;
  margin: 16px;
  box-shadow: 0 2px 4px 0 #00000080;
  border-radius: 12px;
  overflow: hidden;
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

export const FooterLink = styled(Link)`
  text-align: right;
  display: block;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;
