import { useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { Button } from './Button';

export const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={toggleColorMode}
      leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    >
      {`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'}`}
    </Button>
  );
};
