import { Button, Input, Spinner, useDisclosure } from '@chakra-ui/react';
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
import { CustomAlertDialog } from './CustomAlertDialog';
import { CustomPopover } from './CustomPopover';
import { CustomSelect } from './CustomSelect';
import { HeaderContainer } from './HeaderContainer';
import { IconButton } from './IconButton';

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
        <IconButton aria-label="Back to Top" onClick={() => Router.push('/')}>
          <ArrowLeftIcon />
        </IconButton>

        <CustomPopover
          triggerButton={
            <Button rightIcon={<ChevronDownIcon />} fontWeight="normal">
              {dayjs(props.entry.createdAt).format('YYYY-MM-DD')}
            </Button>
          }
        >
          <Input type="datetime-local" {...register('createdAt')} />

          <CustomSelect
            value={tags}
            onSelect={(tags) => setValue('tags', tags)}
            options={props.tagList}
            {...register('tags')}
          />

          <Button onClick={onOpen} leftIcon={<TrashIcon />} color="red.500">
            Delete
          </Button>
          <CustomAlertDialog
            isOpen={isOpen}
            headerText="Delete Entry"
            onClose={onClose}
            onSubmit={() => {
              props.onDelete();
              onClose();
            }}
          />
        </CustomPopover>

        <IconButton type="submit" aria-label="更新">
          {props.isLoading ? (
            <Spinner emptyColor="gray.300" speed="0.65s" />
          ) : (
            <CheckIcon />
          )}
        </IconButton>
      </HeaderContainer>
    </form>
  );
};
