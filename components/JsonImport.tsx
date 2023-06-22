'use client';

import { ArrowUpIcon, CheckIcon } from '@heroicons/react/24/solid';
import { IconButton } from '../app/_components/IconButton';
import { DayOneData, toEntry } from '../domain/DayOneEntry';
import { Entry } from '../domain/Entry';
import { useJsonImport } from '../hooks/useJsonImport';
import { Spinner } from './Spinner';

export const JsonImport = (props: {
  isImported: boolean;
  isImporting: boolean;
  onImport: (props: { entries: Entry[] }) => void;
}) => {
  const { load, data } = useJsonImport<DayOneData>();

  return (
    <div className="flex flex-row">
      <input
        type="file"
        accept="application/json"
        onChange={(e) => {
          const jsonFile = e.target.files?.item(0);
          if (jsonFile == null) return;
          load(jsonFile);
        }}
        className="my-auto dark:text-gray-300"
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
        {props.isImported ? (
          <CheckIcon />
        ) : props.isImporting ? (
          <Spinner />
        ) : (
          <ArrowUpIcon />
        )}
      </IconButton>
    </div>
  );
};
