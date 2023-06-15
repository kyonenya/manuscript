import { ArrowUpIcon, CheckIcon } from '@chakra-ui/icons';
import {  Input, Stack } from '@chakra-ui/react';
import { DayOneData, toEntry } from '../domain/DayOneEntry';
import { Entry } from '../domain/Entry';
import { useJsonImport } from '../hooks/useJsonImport';
import { IconButton } from './IconButton';
import { Spinner } from './Spinner';

export const JsonImport = (props: {
  isImported: boolean;
  isImporting: boolean;
  onImport: (props: { entries: Entry[] }) => void;
}) => {
  const { load, data } = useJsonImport<DayOneData>();

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
        ariaLabel="記事データをインポート"
        onClick={() => {
          if (!data) return;
          props.onImport({
            entries: data.entries.map((entry) => toEntry(entry)),
          });
        }}
      >
        {
          props.isImported ? (
            <CheckIcon />
          ) : props.isImporting ? (
            <Spinner />
          ) : (
            <ArrowUpIcon />
          )
        }
      </IconButton>
    </Stack>
  );
};
