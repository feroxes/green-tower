import { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const BackgroundWrapper = styled(Box)`
  background-image: linear-gradient(to right bottom, #94eeb1, #75cb8f, #56aa6e, #37894f, #156a31);
`;

const BackgroundProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <BackgroundWrapper>{children}</BackgroundWrapper>;
};

export default BackgroundProvider;
