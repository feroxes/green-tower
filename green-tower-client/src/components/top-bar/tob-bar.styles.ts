import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export const TopBarWrapper = styled(Stack)`
  width: 100%;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;
export const LogoutButton = styled(LogoutIcon)`
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: 50%;
  cursor: pointer;
`;
