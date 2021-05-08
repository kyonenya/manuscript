import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 700,
};

export const theme = extendTheme({
  colors: {
    black: '#16161D',
  },
  fonts,
  fontWeights,
  breakpoints,
});
