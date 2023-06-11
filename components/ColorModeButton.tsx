import { useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { ButtonWithLeftIcon } from './ButtonWithLeftIcon';

export const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <ButtonWithLeftIcon
      onClick={toggleColorMode}
      leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    >
      {`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'}`}
    </ButtonWithLeftIcon>
  );
};
