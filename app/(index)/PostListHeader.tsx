'use client';

import {
  ArrowRightStartOnRectangleIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  Cog8ToothIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  TrashIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { Entry } from '../../domain/Entry';
import { updateSearchParams } from '../../domain/utils';
import { Button } from '../_components/Button';
import { HeaderContainer } from '../_components/HeaderContainer';
import { IconButton } from '../_components/IconButton';
import { IconsContainer } from '../_components/IconsContainer';
import { Input } from '../_components/Input';
import { Popover } from '../_components/Popover';
import { Spinner } from '../_components/Spinner';
import { JsonFormInput } from './JsonFormInput';

const activeIconButtonClassName =
  'bg-yellow-200 enabled:hover:bg-yellow-300 dark:bg-indigo-600 enabled:dark:hover:bg-indigo-500';

const DeleteAllFormButton = (props: { deleteAllAction?: () => void }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      variant={{ color: 'warning' }}
      leftIcon={
        pending ? (
          <Spinner className="m-0 mr-2 fill-red-500 dark:fill-rose-500" />
        ) : (
          <TrashIcon />
        )
      }
      disabled={pending || !props.deleteAllAction}
      formAction={() => {
        if (!window.confirm("Are you sure? You can't undo this action."))
          return;
        props.deleteAllAction?.();
      }}
    >
      Delete All
    </Button>
  );
};

export const PostListHeader = (props: {
  isDemoMode?: boolean;
  importAction?: (props: { entries: Entry[] }) => void;
  deleteAllAction?: () => void;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isAscOrder = searchParams.get('order') === 'asc';
  const isSelectMode = !!searchParams.get('select');

  if (!!searchParams.get('preview')) return null; // hide in preview mode

  return (
    <HeaderContainer>
      <IconsContainer>
        <Popover
          side="bottom"
          triggerButton={
            <IconButton>
              <Cog8ToothIcon />
            </IconButton>
          }
        >
          <div className="flex max-w-[300px] flex-col space-y-4">
            <form>
              <JsonFormInput importAction={props.importAction} />
            </form>
            <form>
              <DeleteAllFormButton deleteAllAction={props.deleteAllAction} />
            </form>
            <form>
              {props.isDemoMode ? (
                <Link href="/" passHref>
                  <Button
                    variant={{ color: 'emerald' }}
                    leftIcon={<ArrowRightStartOnRectangleIcon />}
                  >
                    Sign In
                  </Button>
                </Link>
              ) : (
                <Link href="/demo" passHref>
                  <Button type="button" leftIcon={<UsersIcon />}>
                    Try Demo Version
                  </Button>
                </Link>
              )}
            </form>
          </div>
        </Popover>
        <IconButton
          aria-label="Toggle Sort Order"
          className={isAscOrder ? activeIconButtonClassName : ''}
          onClick={() =>
            window.history.replaceState(
              null,
              '',
              updateSearchParams({
                searchParams,
                pathname,
                [isAscOrder ? 'remove' : 'append']: {
                  name: 'order',
                  value: 'asc',
                },
              }),
            )
          }
        >
          {isAscOrder ? <BarsArrowUpIcon /> : <BarsArrowDownIcon />}
        </IconButton>
      </IconsContainer>

      <Input
        leftIconButtonIcon={<MagnifyingGlassIcon />}
        onSearch={(value) =>
          router.push(
            updateSearchParams({
              searchParams,
              pathname,
              [value ? 'append' : 'remove']: { name: 'keyword', value },
            }),
          )
        }
      />

      <IconsContainer>
        <IconButton
          aria-label="Preview Mode"
          onClick={() =>
            window.history.pushState(
              null,
              '',
              updateSearchParams({
                searchParams,
                pathname,
                append: { name: 'preview', value: 'true' },
                remove: { name: 'select' },
              }),
            )
          }
        >
          <EyeIcon />
        </IconButton>
        <IconButton
          aria-label="Toggle Select Mode"
          className={isSelectMode ? activeIconButtonClassName : ''}
          onClick={() =>
            window.history.replaceState(
              null,
              '',
              updateSearchParams({
                searchParams,
                pathname,
                [isSelectMode ? 'remove' : 'append']: {
                  name: 'select',
                  value: 'true',
                },
              }),
            )
          }
        >
          <Squares2X2Icon />
        </IconButton>
      </IconsContainer>
    </HeaderContainer>
  );
};
