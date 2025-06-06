import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ComponentWrapper, LogoWrapper } from './logo.styles';

import { useLsi } from '../../hooks/hooks';

import { Config } from '../../config/config';
import { Constants } from '../../utils/constants';

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
    <ComponentWrapper {...rest} direction={textPosition === 'right' ? 'row' : 'column'}>
      {displayLogo && <LogoWrapper size={logoSize} />}
      {displayText && (
        <Stack direction="row" sx={{ mt: textPosition === 'right' ? 0 : 1, ml: textPosition === 'right' ? 1 : 0 }}>
          <Typography color={Config.colors.deepGreen} sx={{ fontSize, fontWeight: 'bold' }}>
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
