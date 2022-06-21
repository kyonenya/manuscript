import PQueue from 'p-queue';
import { Entry } from '../domain/Entry';
import { splitArray } from '../domain/utils';

export const entriesQueue = async ({
  func,
  entries,
  each,
  concurrency,
}: {
  func: ({ entries }: { entries: Entry[] }) => Promise<unknown>;
  entries: Entry[];
  each: number;
  concurrency: number;
}) => {
  const entriesArray = splitArray(entries, each);
  const queue = new PQueue({ concurrency });
  const promises = entriesArray.map((entries) =>
    queue.add(() => func({ entries }))
  );
  return await Promise.all(promises);
};
