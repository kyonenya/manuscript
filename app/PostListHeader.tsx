'use client';

import {
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CustomAlertDialog } from '../components/CustomAlertDialog';
import { CustomPopover } from '../components/CustomPopover';
import { JsonImport } from '../components/JsonImport';
import { Entry } from '../domain/Entry';
import { updateSearchParams } from '../domain/utils';
import { Button } from './_components/Button';
import { HeaderContainer } from './_components/HeaderContainer';
import { IconButton } from './_components/IconButton';
import { Input } from './_components/Input';

export const PostListHeader = (props: {
  isSelectMode?: boolean;
  isImported?: boolean;
  isImporting?: boolean;
  onSignOut?: () => void;
  onImport?: (props: { entries: Entry[] }) => void;
  onDeleteAll?: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
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
            isImported={props.isImported}
            isImporting={props.isImporting}
            onImport={props.onImport}
          />
          <CustomAlertDialog
            headerText="Delete All Entries"
            triggerElement={
              <Button variant={{ color: 'warning' }} leftIcon={<TrashIcon />}>
                Delete All
              </Button>
            }
            onSubmit={props.onDeleteAll}
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
        leftIconButtonIcon={<MagnifyingGlassIcon />}
        onSearch={(value) =>
          router.push(
            updateSearchParams({
              searchParams,
              pathname,
              [value ? 'append' : 'remove']: { name: 'keyword', value },
            })
          )
        }
      />

      <div className="flex space-x-2">
        {props.isSelectMode && (
          <IconButton
            aria-label="Preview Mode"
            onClick={() =>
              router.push(
                updateSearchParams({
                  searchParams,
                  pathname,
                  append: { name: 'preview', value: 'true' },
                  remove: { name: 'select' },
                })
              )
            }
          >
            <EyeIcon />
          </IconButton>
        )}
        <IconButton
          aria-label="Toggle Select Mode"
          className={
            props.isSelectMode
              ? 'bg-yellow-200 hover:bg-yellow-200 dark:bg-gray-500 dark:hover:bg-gray-500'
              : ''
          }
          onClick={() =>
            router.push(
              updateSearchParams({
                searchParams,
                pathname,
                [props.isSelectMode ? 'remove' : 'append']: {
                  name: 'select',
                  value: 'true',
                },
              })
            )
          }
        >
          <Squares2X2Icon />
        </IconButton>
      </div>
    </HeaderContainer>
  );
};
