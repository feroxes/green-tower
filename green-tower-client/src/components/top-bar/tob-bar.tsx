import Stack from '@mui/material/Stack';

import { LogoutButton, TopBarWrapper } from './tob-bar.styles';

import { useLogout } from '../../hooks/auth/use-logout';

import LanguageSelector from '../language-selector/language-selector';
import Logo from '../logo/logo';

function TopBar() {
  const { refetch } = useLogout();
  function handleOnLogoutClick() {
    refetch();
  }

  return (
    <TopBarWrapper direction="row">
      <Logo textPosition="right" logoSize={36} fontSize={16} />
      <Stack direction="row" sx={{ alignItems: 'center' }}>
        <LanguageSelector displayLanguageName={false} />
        <LogoutButton onClick={handleOnLogoutClick} />
      </Stack>
    </TopBarWrapper>
  );
}

export default TopBar;
