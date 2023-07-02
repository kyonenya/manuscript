'use client';

import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { DayOneData, toEntry } from '../../domain/DayOneEntry';
import { Entry } from '../../domain/Entry';
import { useJsonImport } from '../_hooks/useJsonImport';
import { IconButton } from './IconButton';
import { Spinner } from './Spinner';

export const JsonImport = ({
  importAction,
}: {
  importAction?: (props: { entries: Entry[] }) => void;
}) => {
  const { data, setFile } = useJsonImport<DayOneData>();
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-row justify-between">
      <input
        name="json"
        type="file"
        accept="application/json"
        onChange={(e) => {
          const jsonFile = e.target.files?.item(0);
          if (jsonFile == null) return;
          setFile(jsonFile);
        }}
        className="my-auto max-w-[80%] dark:text-gray-300"
      />
      <IconButton
        aria-label="Import JSON"
        disabled={pending || !importAction}
        formAction={() => {
          if (!data) return;
          importAction?.({
            entries: data.entries.map((entry) => toEntry(entry)),
          });
        }}
      >
        {pending ? <Spinner /> : <ArrowUpIcon />}
      </IconButton>
    </div>
  );
};
