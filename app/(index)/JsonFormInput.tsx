'use client';

import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useFormStatus } from 'react-dom';
import { DayOneData, toEntry } from '../../domain/DayOneEntry';
import { Entry } from '../../domain/Entry';
import { readFileAsText } from '../../domain/utils';
import { IconButton } from '../_components/IconButton';
import { Spinner } from '../_components/Spinner';

export const JsonFormInput = ({
  importAction,
}: {
  importAction?: (props: { entries: Entry[] }) => void;
}) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-row justify-between">
      <input
        name="json"
        type="file"
        accept="application/json"
        className="my-auto max-w-[80%] dark:text-gray-300"
      />
      <IconButton
        aria-label="Import JSON"
        disabled={pending || !importAction}
        formAction={async (formData: FormData) => {
          const file = formData.get('json') as File;
          const data: DayOneData = JSON.parse(await readFileAsText(file));
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
