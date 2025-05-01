import { useLsi } from '../../hooks/hooks';
import { Constants } from '../../utils/constants';
import { Config } from '../../config/config';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ComponentWrapper, LogoWrapper } from './logo.styles';

type LogoPropTypes = {
  logoSize?: number;
  fontSize?: number;
  displayLogo?: boolean;
  displayText?: boolean;
  textPosition?: 'bottom' | 'right';
};

function Logo({
  displayText = true,
  displayLogo = true,
  logoSize = 110,
  fontSize = 54,
  textPosition = 'bottom',
  ...rest
}: LogoPropTypes) {
  const lsi = useLsi();

  return (
    <ComponentWrapper {...rest}>
      {displayLogo && <LogoWrapper size={logoSize} />}
      {displayText && (
        <Stack direction="row" sx={{ marginTop: '8px' }}>
          <Typography color={Config.colors.green} sx={{ fontSize, fontWeight: 'bold' }}>
            {lsi.green}
          </Typography>
          {Constants.space}
          <Typography color={Config.colors.brown} sx={{ fontSize, fontWeight: 'bold' }}>
            {lsi.tower}
          </Typography>
        </Stack>
      )}
    </ComponentWrapper>
  );
}

export default Logo;
