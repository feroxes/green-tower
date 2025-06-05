import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { FC, ReactNode } from 'react';

const BackgroundWrapper = styled(Box)`
  background-image: linear-gradient(to right bottom, #f9f1e3, #dfd2bf);
`;

const BackgroundProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <BackgroundWrapper>{children}</BackgroundWrapper>;
};

export default BackgroundProvider;
