import {
  ArrowBackIcon,
  ChevronDownIcon,
  EditIcon,
  PlusSquareIcon,
  SearchIcon,
  SettingsIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  InputGroup,
  Input,
  InputLeftElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import Router from 'next/router';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

const HeaderMenuContainer = (props: { children: ReactNode }) => {
  return (
    <Box px={4} bg={useColorModeValue('gray.100', 'gray.900')} boxShadow="md">
      <Flex
        h={{ base: 14, md: 16 }}
        alignItems="center"
        justifyContent="space-between"
      >
        {props.children}
      </Flex>
    </Box>
  );
};

export const ArticleHeaderMenu = (props: { createdAt: string | undefined }) => {
  return (
    <HeaderMenuContainer>
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label={'Back to Top'}
        onClick={() => Router.back()}
        size="md"
      />

      <Popover>
        <PopoverTrigger>
          <Button rightIcon={<ChevronDownIcon />} fontWeight="normal">
            {props.createdAt
              ? dayjs(props.createdAt).format('YYYY-MM-DD')
              : '...'}
          </Button>
        </PopoverTrigger>
        <PopoverContent w={{ base: '90vw', md: 'sm' }}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            Are you sure you want to have that milkshake?
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <IconButton icon={<EditIcon />} aria-label="編集" />
    </HeaderMenuContainer>
  );
};

type Form = { keyword: string };

export const TopHeaderMenu = (props: {
  keyword?: string;
  onSearch: (data: Form) => void;
}) => {
  const { register, handleSubmit } = useForm<Form>({
    defaultValues: {
      keyword: props.keyword,
    },
  });

  return (
    <HeaderMenuContainer>
      <IconButton icon={<SettingsIcon />} aria-label="設定" />

      <form onSubmit={handleSubmit(props.onSearch)}>
        <InputGroup w={{ base: '60vw', md: 'sm' }}>
          <InputLeftElement
            p={1}
            borderColor={useColorModeValue('gray.300', 'gray.700')}
          >
            <IconButton aria-label="検索" icon={<SearchIcon />} size="sm" />
          </InputLeftElement>
          <Input
            {...register('keyword')}
            type="text"
            aria-label="記事検索フォーム"
            placeholder="Search"
            borderColor={useColorModeValue('gray.300', 'gray.700')}
          />
        </InputGroup>
      </form>

      <IconButton icon={<PlusSquareIcon />} aria-label="新規作成" />
    </HeaderMenuContainer>
  );
};
