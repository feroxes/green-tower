import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function useDevice() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobileOrTablet = isMobile || isTablet;
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTabledOrDesktop = isTablet || isDesktop;

  return {
    isMobile,
    isTablet,
    isMobileOrTablet,
    isDesktop,
    isTabledOrDesktop,
  };
}
