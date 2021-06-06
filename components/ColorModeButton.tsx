import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, useColorMode } from '@chakra-ui/react';

export const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={toggleColorMode}
      leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    >
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
  );
};
