import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Config } from '../../config/config';

export const PlaceholderWrapper = styled(Stack)<{ color?: string; borderRadius?: string; bgColor?: string }>`
  height: 150px;
  width: 150px;
  background-color: ${({ bgColor = 'rgba(147, 164, 173, 0.12)' }) => bgColor};
  border-radius: ${({ borderRadius = '100px' }) => borderRadius};
  justify-content: center;
  align-items: center;
  svg {
    color: ${({ color = '#9aa7ae' }) => color};
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
