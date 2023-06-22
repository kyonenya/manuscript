import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CheckIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useForm, useWatch } from 'react-hook-form';
import { Button } from '../app/_components/Button';
import { HeaderContainer } from '../app/_components/HeaderContainer';
import { IconButton } from '../app/_components/IconButton';
import { Entry } from '../domain/Entry';
import dayjs from '../infra/dayjs';
import { CustomAlertDialog } from './CustomAlertDialog';
import { CustomPopover } from './CustomPopover';
import { CustomSelect } from './CustomSelect';
import { Spinner } from './Spinner';

type Form = {
  createdAt: string;
  tags: string[];
};

export const ArticleHeader = (props: {
  entry: Entry;
  tagList: string[];
  isLoading: boolean;
  onUpdate: (props: Form) => void;
  onDelete: () => void;
}) => {
  const { register, setValue, control, handleSubmit } = useForm<Form>({
    defaultValues: {
      createdAt: dayjs(props.entry.createdAt).format('YYYY-MM-DDTHH:mm'),
      tags: props.entry.tags,
    },
  });
  const tags = useWatch({ name: 'tags', control });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        props.onUpdate({
          ...data,
          createdAt: dayjs(data.createdAt).tz().format(),
        });
      })}
    >
      <HeaderContainer>
        <Link href="/">
          <IconButton ariaLabel="Back to Top">
            <ArrowLeftIcon />
          </IconButton>
        </Link>
        <CustomPopover
          triggerElement={
            <Button noButton rightIcon={<ChevronDownIcon />}>
              {dayjs(props.entry.createdAt).format('YYYY-MM-DD')}
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
              options={props.tagList}
              {...register('tags')}
            />
            <CustomAlertDialog
              triggerElement={
                <Button
                  noButton
                  leftIcon={<TrashIcon />}
                  className="font-semibold text-red-500 dark:text-rose-500"
                >
                  Delete
                </Button>
              }
              headerText="Delete Entry"
              onSubmit={() => props.onDelete()}
            />
          </div>
        </CustomPopover>
        <IconButton type="submit" ariaLabel="更新">
          {props.isLoading ? <Spinner /> : <CheckIcon />}
        </IconButton>
      </HeaderContainer>
    </form>
  );
};
