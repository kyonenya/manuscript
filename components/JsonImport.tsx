'use client';

import { ArrowUpIcon, CheckIcon } from '@heroicons/react/24/solid';
import { IconButton } from '../app/_components/IconButton';
import { DayOneData, toEntry } from '../domain/DayOneEntry';
import { Entry } from '../domain/Entry';
import { useJsonImport } from '../hooks/useJsonImport';
import { Spinner } from './Spinner';

export const JsonImport = ({
  isImported = false,
  isImporting = false,
  onImport,
}: {
  isImported?: boolean;
  isImporting?: boolean;
  onImport?: (props: { entries: Entry[] }) => void;
}) => {
  const { load, data } = useJsonImport<DayOneData>();

  return (
    <div className="flex flex-row justify-between">
      <input
        type="file"
        accept="application/json"
        onChange={(e) => {
          const jsonFile = e.target.files?.item(0);
          if (jsonFile == null) return;
          load(jsonFile);
        }}
        className="my-auto max-w-[80%] dark:text-gray-300"
      />
      <IconButton
        aria-label="Import JSON"
        disabled={!onImport}
        onClick={() => {
          if (!data || !onImport) return;
          onImport({
            entries: data.entries.map((entry) => toEntry(entry)),
          });
        }}
      >
        {isImported ? (
          <CheckIcon />
        ) : isImporting ? (
          <Spinner />
        ) : (
          <ArrowUpIcon />
        )}
      </IconButton>
    </div>
  );
};
