import { JSX } from 'react';
import Stack from '@mui/material/Stack';
import { PlaceholderWrapper, Header, SubHeader } from './placeholder-box.styles';

interface PlaceholderBoxProps {
  code: 'email';
  header?: string | JSX.Element;
  subHeader?: string | JSX.Element;
}
function PlaceholderBox({ code, header, subHeader }: PlaceholderBoxProps) {
  function getPlaceholder() {
    const placeholdersMap: Record<string, () => JSX.Element> = {
      email: () => (
        <svg width="100" height="100" viewBox="0 0 300 301" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M84 39C70.7452 39 60 49.7452 60 63V104.082C47.6809 105.098 38 115.419 38 128V240C38 253.255 48.7452 264 62 264H238C251.255 264 262 253.255 262 240V128C262 115.419 252.319 105.098 240 104.082V63C240 49.7452 229.255 39 216 39H84Z"
            fill="white"
          ></path>
          <path
            d="M104 77C104 73.6863 106.686 71 110 71H190C193.314 71 196 73.6863 196 77C196 80.3137 193.314 83 190 83H110C106.686 83 104 80.3137 104 77Z"
            fill="currentColor"
          ></path>
          <path
            d="M104 105C104 101.686 106.686 99 110 99H190C193.314 99 196 101.686 196 105C196 108.314 193.314 111 190 111H110C106.686 111 104 108.314 104 105Z"
            fill="currentColor"
          ></path>
          <path
            d="M104 133C104 129.686 106.686 127 110 127H150C153.314 127 156 129.686 156 133C156 136.314 153.314 139 150 139H110C106.686 139 104 136.314 104 133Z"
            fill="currentColor"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M60 104.082C47.6809 105.098 38 115.419 38 128V240C38 253.255 48.7452 264 62 264H238C251.255 264 262 253.255 262 240V128C262 115.419 252.319 105.098 240 104.082V63C240 49.7452 229.255 39 216 39H84C70.7452 39 60 49.7452 60 63V104.082ZM216 47H84C75.1634 47 68 54.1634 68 63V128.509L125.784 175.716L132.529 168.97C141.902 159.598 157.098 159.598 166.471 168.97L173.666 176.166L232 128.509V63C232 54.1634 224.837 47 216 47ZM254 240V129.299C254 125.926 250.082 124.067 247.469 126.201L179.351 181.851L247.843 250.343C248.266 250.766 248.629 251.215 248.934 251.681C252.052 248.762 254 244.608 254 240ZM50.4805 251.104C47.7062 248.227 46 244.313 46 240V129.299C46 125.926 49.9185 124.067 52.5307 126.201L120.098 181.402L51.1568 250.343C50.9111 250.589 50.6858 250.843 50.4805 251.104ZM57.4651 255.348L138.186 174.627C144.435 168.379 154.565 168.379 160.814 174.627L241.746 255.559C240.572 255.841 239.348 255.993 238.089 256L61.908 256C60.3656 255.991 58.8748 255.764 57.4651 255.348Z"
            fill="currentColor"
          ></path>
        </svg>
      ),
    };
    return placeholdersMap[code]();
  }

  return (
    <Stack sx={{ alignItems: 'center' }}>
      <PlaceholderWrapper>{getPlaceholder()}</PlaceholderWrapper>
      {header && <Header>{header}</Header>}
      {subHeader && <SubHeader variant="subtitle2">{subHeader}</SubHeader>}
    </Stack>
  );
}

export default PlaceholderBox;
