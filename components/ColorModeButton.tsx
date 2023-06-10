import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';
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
