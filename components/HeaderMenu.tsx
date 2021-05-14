import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  InputGroup,
  Input,
  InputLeftElement,
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
      //      position={['sticky', '-webkit-sticky']}
      //      top={0}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={<ArrowBackIcon />}
          aria-label={'Back to Top'}
        />

        <HStack spacing={8} alignItems={'center'}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('searched!');
            }}
          >
            <InputGroup size="md">
              <InputLeftElement
                p={1}
                borderColor={useColorModeValue('gray.300', 'gray.700')}
              >
                <IconButton
                  size="sm"
                  aria-label="検索"
                  icon={<SearchIcon />}
                ></IconButton>
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Enter Search Word"
                aria-label="Serach Form"
                borderColor={useColorModeValue('gray.300', 'gray.700')}
              />
            </InputGroup>
          </form>
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
