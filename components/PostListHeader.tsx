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
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Entry } from '../domain/Entry';
import { ButtonWithLeftIcon } from './ButtonWithLeftIcon';
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
            <button className="p-2">
              <SettingsIcon />
            </button>
          }
        >
          <ColorModeButton />
          <JsonImport
            isImported={props.isImported}
            isImporting={props.isImporting}
            onImport={props.onImport}
          />

          <ButtonWithLeftIcon
            onClick={onOpen}
            leftIcon={<DeleteIcon color="red.500" />}
          >
            <span className="text-red-500">Delete All</span>
          </ButtonWithLeftIcon>

          <CustomAlertDialog
            isOpen={isOpen}
            headerText="Delete All Entries"
            onClose={onClose}
            onSubmit={() => {
              props.onDeleteAll();
              onClose();
            }}
          />
          <button className="flex items-center" onClick={props.onSignOut}>
            <IconLogOut strokeWidth={2} className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </CustomPopover>

        <div className="w-60vw md:w-sm">
          <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded">
            <div className="p-1">
              <button type="submit" className="p-1">
                <SearchIcon className="w-4 h-4" />
              </button>
            </div>
            <input
              {...register('searchStr')}
              type="text"
              aria-label="記事検索フォーム"
              placeholder="Search"
              className="w-full py-2 px-2 border-none focus:outline-none bg-transparent"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          {props.isSelectMode && (
            <button
              className="p-2"
              onClick={() => router.push('?preview=true')}
            >
              <ViewIcon />
            </button>
          )}
          <button
            className={clsx('p-2', {
              'bg-yellow-200': props.isSelectMode,
            })}
            onClick={props.toggleSelectMode}
          >
            <IconCheckSquare strokeWidth={2} className="w-4 h-4" />
          </button>
        </div>
      </HeaderContainer>
    </form>
  );
};
