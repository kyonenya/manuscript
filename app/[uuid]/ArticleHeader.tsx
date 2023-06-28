'use client';

import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CheckIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { CustomAlertDialog } from '../../components/CustomAlertDialog';
import { CustomPopover } from '../../components/CustomPopover';
import { CustomSelect } from '../../components/CustomSelect';
import { Spinner } from '../../components/Spinner';
import { Entry } from '../../domain/Entry';
import dayjs from '../../infra/dayjs';
import { Button } from '../_components/Button';
import { HeaderContainer } from '../_components/HeaderContainer';
import { IconButton } from '../_components/IconButton';

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
      <CustomPopover
        triggerElement={
          <Button noButton rightIcon={<ChevronDownIcon />}>
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
          <CustomAlertDialog
            headerText="Delete Entry"
            triggerElement={
              <Button
                noButton
                disabled={!onDelete}
                variant={{ color: 'warning' }}
                leftIcon={<TrashIcon />}
              >
                Delete
              </Button>
            }
            onSubmit={() => onDelete?.()}
          />
        </div>
      </CustomPopover>
      <IconButton
        disabled={!onUpdate}
        type="submit"
        aria-label="更新"
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
