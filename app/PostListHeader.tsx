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
import { Entry } from '../domain/Entry';
import { updateSearchParams } from '../domain/utils';
import { AlertDialog } from './_components/AlertDialog';
import { Button } from './_components/Button';
import { HeaderContainer } from './_components/HeaderContainer';
import { IconButton } from './_components/IconButton';
import { Input } from './_components/Input';
import { JsonImport } from './_components/JsonImport';
import { Popover } from './_components/Popover';

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
      <Popover
        side="bottom"
        triggerButton={
          <IconButton>
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
          <AlertDialog
            headerText="Delete All Entries"
            triggerButton={
              <Button
                variant={{ color: 'warning' }}
                leftIcon={<TrashIcon />}
                disabled={!props.onDeleteAll}
              >
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
      </Popover>

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
