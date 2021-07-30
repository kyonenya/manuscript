import { ArrowUpIcon, CheckIcon } from '@chakra-ui/icons';
import { IconButton, Input, Stack, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { DayOneEntry, toEntry } from '../domain/DayOneEntry';
import { useCreateEntriesMutation } from '../domain/entryUseCase';

export const JsonImport = () => {
  const [entries, setEntries] = useState<DayOneEntry[]>([]);
  const { mutate, isLoading, isSuccess } = useCreateEntriesMutation();
  const queryClient = useQueryClient();

  return (
    <Stack direction="row">
      <Input
        type="file"
        accept="application/json"
        onChange={(e) => {
          const jsonFile = e.target.files?.item(0);
          if (jsonFile == null) return;

          const fileReader = new FileReader();
          fileReader.onload = (e) => {
            if (!e.target?.result) return;
            const result = JSON.parse(e.target.result as string);
            setEntries(result.entries);
          };

          fileReader.readAsText(jsonFile);
        }}
      />
      <IconButton
        aria-label="記事データをインポート"
        icon={
          isSuccess ? <CheckIcon /> : isLoading ? <Spinner /> : <ArrowUpIcon />
        }
        onClick={() =>
          mutate(
            { entries: entries.map((entry) => toEntry(entry)) },
            { onSuccess: () => queryClient.invalidateQueries(['entries']) }
          )
        }
      />
    </Stack>
  );
};
