import {
  ArrowBackIcon,
  ChevronDownIcon,
  DeleteIcon,
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
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import Router from 'next/router';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { ColorModeButton } from './ColorModeButton';
import { CustomAlertDialog } from './CustomAlertDialog';
import { CustomPopover } from './CustomPopover';

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

export const ArticleHeaderMenu = (props: {
  createdAt: string | undefined;
  onDelete: () => void;
}) => {
  const { register, handleSubmit } = useForm<{ createdAt: string }>({
    defaultValues: {
      createdAt: dayjs(props.createdAt).format('YYYY-MM-DDTHH:mm'),
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HeaderMenuContainer>
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label={'Back to Top'}
        onClick={() => Router.back()}
        size="md"
      />

      <CustomPopover
        triggerButton={
          <Button rightIcon={<ChevronDownIcon />} fontWeight="normal">
            {props.createdAt
              ? dayjs(props.createdAt).format('YYYY-MM-DD')
              : '...'}
          </Button>
        }
      >
        <Input type="datetime-local" {...register('createdAt')} />
        <Button onClick={onOpen} leftIcon={<DeleteIcon />} color="red.500">
          Delete
        </Button>
        <CustomAlertDialog
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={() => {
            props.onDelete();
            onClose();
          }}
        />
      </CustomPopover>

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
      <CustomPopover
        placement="bottom-end"
        triggerButton={<IconButton icon={<SettingsIcon />} aria-label="設定" />}
      >
        <ColorModeButton />
      </CustomPopover>

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
