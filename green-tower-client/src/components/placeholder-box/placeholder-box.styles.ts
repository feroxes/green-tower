import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Config } from '../../config/config';

export const PlaceholderWrapper = styled(Stack)`
  height: 150px;
  width: 150px;
  background-color: rgba(147, 164, 173, 0.12);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  svg {
    color: #9aa7ae;
  }
`;

export const Header = styled(Typography)`
  color: ${Config.colors.brown};
  font-weight: bold;
  text-align: center;
  margin: 8px 0;
`;

export const SubHeader = styled(Typography)`
  color: ${Config.colors.brown};
  text-align: center;
`;
