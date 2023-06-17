import {
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { Entry } from '../domain/Entry';
import { Button } from './Button';
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

  return (
    <form onSubmit={handleSubmit(props.onSearch)}>
      <HeaderContainer>
        <CustomPopover
          placement="bottom"
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
          <CustomAlertDialog
            triggerButton={
              <Button
                leftIcon={<TrashIcon />}
                className="font-semibold text-red-500 dark:text-rose-500"
              >
                Delete All
              </Button>
            }
            headerText="Delete All Entries"
            onSubmit={() => props.onDeleteAll()}
          />
          <Button
            leftIcon={<ArrowLeftOnRectangleIcon />}
            onClick={props.onSignOut}
          >
            Sign Out
          </Button>
        </CustomPopover>

        {/* InputGroup from Chakra UI */}
        <div className="flex w-full items-center rounded-md border border-gray-300 dark:border-gray-700 sm:w-64">
          <IconButton type="submit">
            <MagnifyingGlassIcon />
          </IconButton>
          <input
            {...register('searchStr')}
            type="text"
            aria-label="記事検索フォーム"
            placeholder="Search"
            className="ml-0.5 flex-grow border-none bg-transparent px-2 py-2 text-black outline-none dark:text-white"
          />
        </div>

        <div className="flex space-x-2">
          {props.isSelectMode && (
            <IconButton onClick={() => router.push('?preview=true')}>
              <EyeIcon />
            </IconButton>
          )}
          <IconButton
            className={twMerge(
              props.isSelectMode &&
                'bg-yellow-200 hover:bg-yellow-200 dark:bg-gray-500 dark:hover:bg-gray-500'
            )}
            onClick={props.toggleSelectMode}
          >
            <Squares2X2Icon />
          </IconButton>
        </div>
      </HeaderContainer>
    </form>
  );
};
