'use cache';
import { unstable_cache } from 'next/cache';
import { readOne } from '../../infra/entryRepository';
import type { Entry } from '../../domain/Entry';

export async function getEntry(uuid: string): Promise<Entry | undefined> {
  const fetcher = unstable_cache(async () => readOne({ uuid }), [uuid], {
    tags: ['entry', `entry:${uuid}`],
  });

  return fetcher();
}
