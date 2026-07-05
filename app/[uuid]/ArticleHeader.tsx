'use client';

import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CheckIcon,
  TrashIcon,
  StarIcon,
} from '@heroicons/react/24/solid';
import { fromZonedTime } from 'date-fns-tz';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { useForm, useWatch } from 'react-hook-form';
import { Entry } from '../../domain/Entry';
import { formatTZ } from '../../domain/dateUtils';
import { Button } from '../_components/Button';
import { HeaderContainer } from '../_components/HeaderContainer';
import { IconButton } from '../_components/IconButton';
import { IconCheckbox } from '../_components/IconCheckbox';
import { IconsContainer } from '../_components/IconsContainer';
import { Popover } from '../_components/Popover';
import { Select } from '../_components/Select';
import { Spinner } from '../_components/Spinner';

type Form = Pick<Entry, 'createdAt' | 'tags' | 'starred'>;

const DeleteFormButton = (props: { deleteAction?: () => Promise<void> }) => {
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
      disabled={pending || !props.deleteAction}
      formAction={async () => {
        if (!window.confirm("Are you sure? You can't undo this action."))
          return;
        await props.deleteAction?.();
      }}
    >
      Delete
    </Button>
  );
};

const UpdateFormButton = (props: {
  entry: Entry;
  updateAction?: (props: { entry: Entry }) => void;
  handleSubmit: ReturnType<typeof useForm<Form>>['handleSubmit'];
}) => {
  const { pending } = useFormStatus();
  return (
    <IconButton
      aria-label="Update Entry"
      disabled={pending || !props.updateAction}
      formAction={() =>
        props.handleSubmit((formData: Form) =>
          props.updateAction?.({
            entry: {
              ...props.entry,
              ...formData,
              createdAt: fromZonedTime(
                formData.createdAt, // local 時刻文字列
                'Asia/Tokyo',
              ).toISOString(),
            },
          }),
        )()
      }
    >
      {pending ? <Spinner /> : <CheckIcon />}
    </IconButton>
  );
};

export const ArticleHeader = ({
  entry,
  tagHistory = [],
  updateAction,
  deleteAction,
}: {
  entry: Entry;
  tagHistory?: string[];
  isDemoMode?: boolean;
  updateAction?: (props: { entry: Entry }) => void;
  deleteAction?: () => Promise<void>;
}) => {
  const { register, setValue, control, handleSubmit } = useForm<Form>({
    defaultValues: {
      createdAt: formatTZ(entry.createdAt, "yyyy-MM-dd'T'HH:mm"),
      tags: entry.tags,
      starred: entry.starred,
    },
  });
  const router = useRouter();
  const tags = useWatch({ name: 'tags', control });

  return (
    <HeaderContainer>
      <IconsContainer>
        <IconButton aria-label="Back" type="button" onClick={router.back}>
          <ArrowLeftIcon />
        </IconButton>
        <div aria-hidden className="w-10" />
      </IconsContainer>

      <Popover
        triggerButton={
          <Button rightIcon={<ChevronDownIcon />} className="w-auto">
            {formatTZ(entry.createdAt, 'yyyy-MM-dd')}
          </Button>
        }
        side="bottom"
      >
        <div className="flex min-w-[300px] flex-col space-y-4">
          <input
            type="datetime-local"
            className="mx-auto h-10 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300"
            {...register('createdAt')}
          />
          <Select
            value={tags}
            choices={tagHistory}
            onSelect={(tags) => setValue('tags', tags)}
            {...register('tags')}
          />
          <form>
            <DeleteFormButton deleteAction={deleteAction} />
          </form>
        </div>
      </Popover>

      <IconsContainer>
        <IconCheckbox aria-label="Like Entry" {...register('starred')}>
          <StarIcon />
        </IconCheckbox>
        <form>
          <UpdateFormButton
            entry={entry}
            updateAction={updateAction}
            handleSubmit={handleSubmit}
          />
        </form>
      </IconsContainer>
    </HeaderContainer>
  );
};

export const ArticleHeaderEmpty = () => {
  return (
    <HeaderContainer>
      <IconsContainer>
        <IconButton aria-label="Back">
          <ArrowLeftIcon />
        </IconButton>
        <div aria-hidden className="w-10" />
      </IconsContainer>

      <Button
        aria-label="Entry Date"
        rightIcon={<ChevronDownIcon />}
        className="w-auto"
      >
        <div className="w-20" />
      </Button>

      <IconsContainer>
        <IconCheckbox aria-label="Like Entry">
          <StarIcon />
        </IconCheckbox>
        <IconButton aria-label="Update Entry">
          <CheckIcon />
        </IconButton>
      </IconsContainer>
    </HeaderContainer>
  );
};
