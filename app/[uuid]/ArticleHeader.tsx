'use client';

import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CheckIcon,
  TrashIcon,
  StarIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { Entry } from '../../domain/Entry';
import dayjs from '../../infra/dayjs';
import { Button } from '../_components/Button';
import { HeaderContainer } from '../_components/HeaderContainer';
import { IconButton } from '../_components/IconButton';
import { IconCheckbox } from '../_components/IconCheckbox';
import { Popover } from '../_components/Popover';
import { Select } from '../_components/Select';
import { Spinner } from '../_components/Spinner';

type Form = Pick<Entry, 'createdAt' | 'tags' | 'starred'>;

export const ArticleHeader = ({
  entry,
  tagList = [],
  isLoading = false,
  updateAction,
  deleteAction,
}: {
  entry: Entry;
  tagList?: string[];
  isLoading?: boolean;
  updateAction?: (props: { entry: Entry }) => void;
  deleteAction?: () => Promise<void>;
}) => {
  const router = useRouter();
  const { register, setValue, control, handleSubmit } = useForm<Form>({
    defaultValues: {
      createdAt: dayjs(entry.createdAt).format('YYYY-MM-DDTHH:mm'),
      tags: entry.tags,
      starred: entry.starred,
    },
  });
  const tags = useWatch({ name: 'tags', control });

  return (
    <HeaderContainer>
      <IconButton onClick={router.back}>
        <ArrowLeftIcon />
      </IconButton>

      <Popover
        triggerButton={
          <Button rightIcon={<ChevronDownIcon />} className="w-auto">
            {dayjs(entry.createdAt).format('YYYY-MM-DD')}
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
            onSelect={(tags) => setValue('tags', tags)}
            options={tagList}
            {...register('tags')}
          />
          <form>
            <Button
              variant={{ color: 'warning' }}
              leftIcon={<TrashIcon />}
              disabled={!deleteAction}
              formAction={async () => {
                if (
                  !window.confirm("Are you sure? You can't undo this action.")
                )
                  return;
                await deleteAction?.();
              }}
            >
              Delete
            </Button>
          </form>
        </div>
      </Popover>

      <div className="flex space-x-2">
        <IconCheckbox aria-label="Like Entry" {...register('starred')}>
          <StarIcon />
        </IconCheckbox>
        <form>
          <IconButton
            aria-label="Update Entry"
            disabled={!updateAction}
            formAction={() =>
              handleSubmit((formData: Form) =>
                updateAction?.({
                  entry: {
                    ...entry,
                    ...formData,
                    createdAt: dayjs(formData.createdAt).tz().format(),
                  },
                })
              )()
            }
          >
            {isLoading ? <Spinner /> : <CheckIcon />}
          </IconButton>
        </form>
      </div>
    </HeaderContainer>
  );
};
