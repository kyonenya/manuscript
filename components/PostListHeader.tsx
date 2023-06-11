import { useDisclosure } from '@chakra-ui/react';
import {
  TrashIcon,
  MagnifyingGlassIcon,
  Cog8ToothIcon,
  EyeIcon,
} from '@heroicons/react/24/solid';
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
            <button className="w-10 h-10 rounded-md border border-transparent focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150 ease-in-out">
              <Cog8ToothIcon className="w-5 m-auto" />
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
            leftIcon={<IconLogOut />}
            onClick={props.onSignOut}
          >
            Sign Out
          </ButtonWithLeftIcon>
        </CustomPopover>

        <div className="w-60vw md:w-sm">
          <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded">
            <div className="p-1">
              <button type="submit" className="p-1">
                <MagnifyingGlassIcon className="w-4" />
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
              <EyeIcon className="w-4" />
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
