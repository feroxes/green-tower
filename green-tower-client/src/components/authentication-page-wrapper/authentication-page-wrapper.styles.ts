import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

export const PageWrapper = styled(Stack)`
  min-height: calc(100vh - 42px);
  align-items: center;
  padding-top: 42px;
`;

export const FormContainer = styled(Stack)`
  width: 340px;
  margin: 16px;
  box-shadow: 0 2px 4px 0 #00000080;
  border-radius: 12px;
  overflow: hidden;
  justify-content: space-between;
`;
