'use client';

import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useActionState } from 'react';
import { DayOneData, toEntry } from '../../domain/DayOneEntry';
import { Entry } from '../../domain/Entry';
import { readFileAsText } from '../../domain/utils';
import { IconButton } from '../_components/IconButton';
import { Spinner } from '../_components/Spinner';

export const JsonFormInput = ({
  importAction,
}: {
  importAction?: (props: { entries: Entry[] }) => Promise<void> | void;
}) => {
  const [errorState, dispatchImport, pending] = useActionState(
    async (_previousError: string | null, formData: FormData) => {
      if (!importAction) return 'Import is unavailable.';

      const file = formData.get('json');
      if (!(file instanceof File) || file.size === 0) {
        return 'Select a JSON file.';
      }

      try {
        const data: DayOneData = JSON.parse(await readFileAsText(file));
        await importAction({
          entries: data.entries.map((entry) => toEntry(entry)),
        });
        return null;
      } catch {
        return 'Failed to import JSON.';
      }
    },
    null,
  );

  return (
    <>
      <div className="flex flex-row justify-between">
        <input
          required
          name="json"
          type="file"
          accept="application/json"
          className="my-auto max-w-[80%] dark:text-gray-300"
        />
        <IconButton
          aria-label="Import JSON"
          disabled={pending || !importAction}
          formAction={dispatchImport}
        >
          {pending ? <Spinner /> : <ArrowUpIcon />}
        </IconButton>
      </div>
      {errorState && (
        <p className="text-sm text-red-500 dark:text-rose-500">{errorState}</p>
      )}
    </>
  );
};
