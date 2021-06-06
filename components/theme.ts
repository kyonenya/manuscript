import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  // (20em: iPad 1/3) (iPhone)
  sm: '30em', // (iPad 1/2)
  md: '42em', // (iPad 2/3) default: '48em'
  lg: '62em', // (iPad 1/1)
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
  initialColorMode: 'light',
  useSystemColorMode: true,
});
