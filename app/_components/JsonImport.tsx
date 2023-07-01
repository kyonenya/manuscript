'use client';

import { ArrowUpIcon, CheckIcon } from '@heroicons/react/24/solid';
import { DayOneData, toEntry } from '../../domain/DayOneEntry';
import { Entry } from '../../domain/Entry';
import { useJsonImport } from '../../hooks/useJsonImport';
import { IconButton } from './IconButton';
import { Spinner } from './Spinner';

export const JsonImport = ({
  isImported = false,
  isImporting = false,
  importAction,
}: {
  isImported?: boolean; // unused when Server Actions
  isImporting?: boolean; // unused when Server Actions
  importAction?: (props: { entries: Entry[] }) => void;
}) => {
  const { load, data } = useJsonImport<DayOneData>();

  return (
    <form>
      <div className="flex flex-row justify-between">
        <input
          name="json"
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
          disabled={!importAction}
          formAction={() => {
            if (!data) return;
            importAction?.({
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
    </form>
  );
};
