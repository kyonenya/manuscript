import { ArrowUpIcon, CheckIcon } from '@chakra-ui/icons';
import { IconButton, Input, Stack, Spinner } from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { DayOneData, toEntry } from '../domain/DayOneEntry';
import { useCreateEntriesQueueMutation } from '../domain/entryUseCase';
import { useJsonImport } from '../hooks/useJsonImport';

export const JsonImport = () => {
  const { load, data } = useJsonImport<DayOneData>();
  const { mutate, isLoading, isSuccess } = useCreateEntriesQueueMutation();
  const queryClient = useQueryClient();

  return (
    <Stack direction="row">
      <Input
        type="file"
        accept="application/json"
        onChange={(e) => {
          const jsonFile = e.target.files?.item(0);
          if (jsonFile == null) return;
          load(jsonFile);
        }}
      />
      <IconButton
        aria-label="記事データをインポート"
        icon={
          isSuccess ? <CheckIcon /> : isLoading ? <Spinner /> : <ArrowUpIcon />
        }
        onClick={() => {
          if (!data) return;
          mutate(
            { entries: data.entries.map((entry) => toEntry(entry)) },
            { onSuccess: () => queryClient.invalidateQueries('entries') }
          );
        }}
      />
    </Stack>
  );
};
