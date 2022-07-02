import {
  DeleteIcon,
  SearchIcon,
  SettingsIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  InputGroup,
  Input,
  InputLeftElement,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { IconCheckSquare, IconLogOut } from '@supabase/ui';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Entry } from '../domain/Entry';
import { ColorModeButton } from './ColorModeButton';
import { CustomAlertDialog } from './CustomAlertDialog';
import { CustomPopover } from './CustomPopover';
import { HeaderContainer } from './HeaderContainer';
import { JsonImport } from './JsonImport';

type Form = { searchStr: string };

export const PostListHeader = (props: {
  searchStr: string | undefined;
  isSelectMode: boolean;
  isImported: boolean;
  isImporting: boolean;
  onSearch: (data: Form) => void;
  onSignOut: () => void;
  toggleSelectMode: () => void;
  onImport: (props: { entries: Entry[] }) => void;
  onDeleteAll: () => void;
}) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Form>({
    defaultValues: {
      searchStr: props.searchStr,
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <form onSubmit={handleSubmit(props.onSearch)}>
      <HeaderContainer>
        <CustomPopover
          placement="bottom-end"
          triggerButton={
            <IconButton icon={<SettingsIcon />} aria-label="設定" />
          }
        >
          <ColorModeButton />
          <JsonImport
            isImported={props.isImported}
            isImporting={props.isImporting}
            onImport={props.onImport}
          />
          <Button onClick={onOpen} leftIcon={<DeleteIcon />} color="red.500">
            Delete
          </Button>
          <CustomAlertDialog
            isOpen={isOpen}
            headerText="Delete All Entries"
            onClose={onClose}
            onSubmit={() => {
              props.onDeleteAll();
              onClose();
            }}
          />
          <Button
            onClick={props.onSignOut}
            leftIcon={<IconLogOut strokeWidth={2} />}
          >
            Sign Out
          </Button>
        </CustomPopover>

        <InputGroup w={{ base: '60vw', md: 'sm' }}>
          <InputLeftElement
            p={1}
            borderColor={useColorModeValue('gray.300', 'gray.700')}
          >
            <IconButton aria-label="検索" icon={<SearchIcon />} size="sm" />
          </InputLeftElement>
          <Input
            {...register('searchStr')}
            type="text"
            aria-label="記事検索フォーム"
            placeholder="Search"
            borderColor={useColorModeValue('gray.300', 'gray.700')}
          />
        </InputGroup>

        <Stack direction="row">
          {props.isSelectMode && (
            <IconButton
              icon={<ViewIcon />}
              aria-label="プレビュー"
              onClick={() => router.push('?preview=true')}
            />
          )}
          <IconButton
            icon={<IconCheckSquare strokeWidth={2} size={18} />}
            aria-label="複数選択"
            onClick={props.toggleSelectMode}
            bg={
              props.isSelectMode
                ? useColorModeValue('yellow.200', 'gray.500')
                : undefined
            }
          />
        </Stack>
      </HeaderContainer>
    </form>
  );
};
