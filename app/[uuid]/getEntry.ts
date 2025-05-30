'use cache';
import { unstable_cache } from 'next/cache';
import type { Entry } from '../../domain/Entry';
import { readOne } from '../../infra/entryRepository';

/** @see https://github.com/vercel/next.js/discussions/63099#discussioncomment-9357470 */
export async function getEntry(uuid: string): Promise<Entry | undefined> {
  const fetcher = unstable_cache(async () => readOne({ uuid }), [uuid], {
    tags: ['entry', `entry:${uuid}`],
  });

  return fetcher();
}
