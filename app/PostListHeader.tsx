'use client';

import {
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { CustomAlertDialog } from '../components/CustomAlertDialog';
import { CustomPopover } from '../components/CustomPopover';
import { JsonImport } from '../components/JsonImport';
import { Entry } from '../domain/Entry';
import { Button } from './_components/Button';
import { HeaderContainer } from './_components/HeaderContainer';
import { IconButton } from './_components/IconButton';
import { Input } from './_components/Input';

type Form = { searchStr: string };

export const PostListHeader = (props: {
  searchStr?: string | undefined;
  isSelectMode?: boolean;
  isImported?: boolean;
  isImporting?: boolean;
  onSearch?: (data: Form) => void;
  onSignOut?: () => void;
  toggleSelectMode?: () => void;
  onImport?: (props: { entries: Entry[] }) => void;
  onDeleteAll?: () => void;
}) => {
  const router = useRouter();
  const { register, handleSubmit: _handleSubmit } = useForm<Form>({
    defaultValues: {
      searchStr: props.searchStr,
    },
  });

  return (
    // @ts-ignore
    // <form onSubmit={handleSubmit(props.onSearch)}>
    <HeaderContainer>
      <CustomPopover
        placement="bottom"
        triggerElement={
          <IconButton noButton>
            <Cog8ToothIcon />
          </IconButton>
        }
      >
        <div className="flex max-w-[300px] flex-col space-y-4">
          <JsonImport
            // @ts-ignore
            isImported={props.isImported}
            // @ts-ignore
            isImporting={props.isImporting}
            // @ts-ignore
            onImport={props.onImport}
          />
          <CustomAlertDialog
            triggerElement={
              <Button variant={{ color: 'warning' }} leftIcon={<TrashIcon />}>
                Delete All
              </Button>
            }
            headerText="Delete All Entries"
            // @ts-ignore
            onSubmit={() => props.onDeleteAll()}
          />
          <form>
            <Button
              leftIcon={<ArrowLeftOnRectangleIcon />}
              formAction={props.onSignOut}
            >
              Sign Out
            </Button>
          </form>
        </div>
      </CustomPopover>

      <Input
        type="search"
        inputLeftElement={
          <IconButton type="submit" className="z-10 p-0">
            <MagnifyingGlassIcon className="w-5" />
          </IconButton>
        }
        inputClassName="pl-11 pr-2"
      />

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
    // </form>
  );
};
