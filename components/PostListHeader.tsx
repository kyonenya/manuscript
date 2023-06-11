import { useDisclosure } from '@chakra-ui/react';
import {
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Entry } from '../domain/Entry';
import { ButtonWithLeftIcon } from './ButtonWithLeftIcon';
import { ColorModeButton } from './ColorModeButton';
import { CustomAlertDialog } from './CustomAlertDialog';
import { CustomPopover } from './CustomPopover';
import { HeaderContainer } from './HeaderContainer';
import { IconButton } from './IconButton';
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
            <IconButton>
              <Cog8ToothIcon />
            </IconButton>
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
            leftIcon={<TrashIcon />}
            className="text-red-500 dark:text-red-500"
          >
            Delete All
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
          <ButtonWithLeftIcon
            leftIcon={<ArrowLeftOnRectangleIcon />}
            onClick={props.onSignOut}
          >
            Sign Out
          </ButtonWithLeftIcon>
        </CustomPopover>

        <div className="flex w-full sm:w-64 items-center border border-gray-300 dark:border-gray-700 rounded-md">
          <IconButton type="submit">
            <MagnifyingGlassIcon />
          </IconButton>
          <input
            {...register('searchStr')}
            type="text"
            aria-label="記事検索フォーム"
            placeholder="Search"
            className="flex-grow py-2 px-2 ml-0.5 bg-transparent border-none outline-none text-black dark:text-white"
          />
        </div>

        <div className="flex space-x-2">
          {props.isSelectMode && (
            <IconButton onClick={() => router.push('?preview=true')}>
              <EyeIcon />
            </IconButton>
          )}
          <IconButton
            className={clsx({
              'bg-yellow-200 hover:bg-yellow-200 dark:bg-gray-500 dark:hover:bg-gray-500':
                props.isSelectMode,
            })}
            onClick={props.toggleSelectMode}
          >
            <Squares2X2Icon />
          </IconButton>
        </div>
      </HeaderContainer>
    </form>
  );
};
