import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

export const AuthenticationWrapper = styled(Stack)`
  height: calc(100vh - 42px);
  align-items: center;
  padding-top: 42px;
`;

export const FormWrapper = styled(Stack)`
  width: 340px;
  height: 420px;
  padding: 24px;
  margin: 16px;
  box-shadow: 0 2px 4px 0 #00000080;
  border-radius: 12px;
`;
