import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export const PageWrapper = styled(Stack)`
  min-height: 100vh;
  align-items: center;
  padding-top: 42px;
`;

export const FormContainer = styled(Paper)`
  width: 370px;
  display: flex;
  flex-direction: column;
  margin: 16px;
  box-shadow:
    -16px 0px 32px rgba(0, 0, 0, 0.1),
    0px 12px 20px rgba(0, 0, 0, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 32px;
  overflow: hidden;
  justify-content: space-between;
`;
