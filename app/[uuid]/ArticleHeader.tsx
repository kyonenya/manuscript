'use client';

import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CheckIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { CustomSelect } from '../../components/CustomSelect';
import { Spinner } from '../../components/Spinner';
import { Entry } from '../../domain/Entry';
import dayjs from '../../infra/dayjs';
import { AlertDialog } from '../_components/AlertDialog';
import { Button } from '../_components/Button';
import { HeaderContainer } from '../_components/HeaderContainer';
import { IconButton } from '../_components/IconButton';
import { Popover } from '../_components/Popover';

type Form = {
  createdAt: string;
  tags: string[];
};

export const ArticleHeader = ({
  entry,
  tagList = [],
  isLoading = false,
  onUpdate,
  onDelete,
}: {
  entry: Entry;
  tagList?: string[];
  isLoading?: boolean;
  onUpdate?: (props: Form) => void;
  onDelete?: () => void;
}) => {
  const router = useRouter();
  const { register, setValue, control, handleSubmit } = useForm<Form>({
    defaultValues: {
      createdAt: dayjs(entry.createdAt).format('YYYY-MM-DDTHH:mm'),
      tags: entry.tags,
    },
  });
  const tags = useWatch({ name: 'tags', control });

  return (
    <HeaderContainer>
      <IconButton onClick={() => router.back()}>
        <ArrowLeftIcon />
      </IconButton>

      <Popover
        triggerButton={
          <Button rightIcon={<ChevronDownIcon />} className="w-auto">
            {dayjs(entry.createdAt).format('YYYY-MM-DD')}
          </Button>
        }
        placement="bottom"
      >
        <div className="flex min-w-[300px] flex-col space-y-4">
          <input
            type="datetime-local"
            {...register('createdAt')}
            className="mx-auto h-10 w-full rounded-md border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300"
          />
          <CustomSelect
            value={tags}
            onSelect={(tags) => setValue('tags', tags)}
            options={tagList}
            {...register('tags')}
          />
          <AlertDialog
            headerText="Delete Entry"
            triggerButton={
              <Button
                variant={{ color: 'warning' }}
                leftIcon={<TrashIcon />}
                disabled={!onDelete}
              >
                Delete
              </Button>
            }
            onSubmit={onDelete}
          />
        </div>
      </Popover>

      <IconButton
        type="submit"
        aria-label="Update Entry"
        disabled={!onUpdate}
        onClick={handleSubmit((data) => {
          if (!onUpdate) return;
          onUpdate({
            ...data,
            createdAt: dayjs(data.createdAt).tz().format(),
          });
        })}
      >
        {isLoading ? <Spinner /> : <CheckIcon />}
      </IconButton>
    </HeaderContainer>
  );
};
