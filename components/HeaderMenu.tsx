import { ArrowBackIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons';
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
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

type Form = { keyword: string };

export const TopHeaderMenu = (props: { onSearch: (data: Form) => void }) => {
  const { register, handleSubmit } = useForm<Form>();
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

        <form onSubmit={handleSubmit(props.onSearch)}>
          <InputGroup size="md">
            <InputLeftElement
              p={1}
              borderColor={useColorModeValue('gray.300', 'gray.700')}
              children={
                <IconButton aria-label="検索" icon={<SearchIcon />} size="sm" />
              }
            />
            <Input
              {...register('keyword')}
              type="text"
              aria-label="記事検索フォーム"
              placeholder="Search"
              borderColor={useColorModeValue('gray.300', 'gray.700')}
            />
          </InputGroup>
        </form>

        <IconButton
          icon={<SettingsIcon />}
          aria-label="設定"
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
    </Box>
  );
};
