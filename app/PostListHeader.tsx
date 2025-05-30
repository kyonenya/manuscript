'use client';

import {
  ArrowRightOnRectangleIcon,
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
import { Entry } from '../domain/Entry';
import { updateSearchParams } from '../domain/utils';
import { JsonFormInput } from './JsonFormInput';
import { Button } from './_components/Button';
import { HeaderContainer } from './_components/HeaderContainer';
import { IconButton } from './_components/IconButton';
import { IconsContainer } from './_components/IconsContainer';
import { Input } from './_components/Input';
import { Popover } from './_components/Popover';
import { Spinner } from './_components/Spinner';

export const PostListHeader = (props: {
  isSelectMode?: boolean;
  isDemoMode?: boolean;
  importAction?: (props: { entries: Entry[] }) => void;
  deleteAllAction?: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const DeleteAllFormButton = () => {
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
          <form>
            <JsonFormInput importAction={props.importAction} />
          </form>
          <form>
            <DeleteAllFormButton />
          </form>
          <form>
            {props.isDemoMode ? (
              <Link href="/" passHref>
                <Button
                  variant={{ color: 'emerald' }}
                  leftIcon={<ArrowRightOnRectangleIcon />}
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
        {props.isSelectMode ? (
          <IconButton
            aria-label="Preview Mode"
            onClick={() =>
              router.push(
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
        ) : (
          <div aria-hidden className="w-10" />
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
