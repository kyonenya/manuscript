import { useDisclosure } from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CheckIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import Router from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { Entry } from '../domain/Entry';
import dayjs from '../infra/dayjs';
import { Button } from './Button';
import { CustomAlertDialog } from './CustomAlertDialog';
import { CustomPopover } from './CustomPopover';
import { CustomSelect } from './CustomSelect';
import { HeaderContainer } from './HeaderContainer';
import { IconButton } from './IconButton';
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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <IconButton ariaLabel="Back to Top" onClick={() => Router.push('/')}>
          <ArrowLeftIcon />
        </IconButton>

        <CustomPopover
          triggerButton={
            <Button rightIcon={<ChevronDownIcon />}>
              {dayjs(props.entry.createdAt).format('YYYY-MM-DD')}
            </Button>
          }
        >
          <input type="datetime-local" {...register('createdAt')} />
          <CustomSelect
            value={tags}
            onSelect={(tags) => setValue('tags', tags)}
            options={props.tagList}
            {...register('tags')}
          />
          <CustomAlertDialog
            triggerButton={
              <Button
                leftIcon={<TrashIcon />}
                className="text-red-500 dark:text-rose-500 font-semibold"
              >
                Delete
              </Button>
            }
            headerText="Delete Entry"
            onSubmit={() => props.onDelete()}
          />
        </CustomPopover>
        <IconButton type="submit" ariaLabel="更新">
          {props.isLoading ? <Spinner /> : <CheckIcon />}
        </IconButton>
      </HeaderContainer>
    </form>
  );
};
