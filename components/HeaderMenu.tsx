import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  InputGroup,
  Input,
  InputRightAddon,
  Link,
  Stack,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons';

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

export const TopHeaderMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      px={4}
      bg={useColorModeValue('gray.100', 'gray.900')}
      boxShadow={'md'}
      position={['sticky', '-webkit-sticky']}
      top={0}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={<ArrowBackIcon />}
          aria-label={'Back to Top'}
        />

        <HStack spacing={8} alignItems={'center'}>
          <InputGroup size="md">
            <Input
              type="text"
              placeholder="Enter Search Word"
              aria-label="Serach Form"
              borderColor={useColorModeValue('gray.300', 'gray.700')}
            />
            <InputRightAddon
              p={1}
              borderColor={useColorModeValue('gray.300', 'gray.700')}
            >
              <IconButton
                size="sm"
                aria-label="検索"
                icon={<SearchIcon />}
              ></IconButton>
            </InputRightAddon>
          </InputGroup>
        </HStack>

        <Flex alignItems={'center'}>
          <IconButton
            icon={<SettingsIcon />}
            aria-label="設定"
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
