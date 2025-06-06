import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { FC, ReactNode } from 'react';

const BackgroundWrapper = styled(Box)`
  background-image: linear-gradient(to right bottom, #fefbe2, #fdf2d1);
`;

const BackgroundProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <BackgroundWrapper>{children}</BackgroundWrapper>;
};

export default BackgroundProvider;
