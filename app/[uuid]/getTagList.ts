'use cache';
import { unstable_cache } from 'next/cache';
import { readTagList } from '../../infra/entryRepository';

export async function getTagList(): Promise<string[]> {
  const fetcher = unstable_cache(async () => readTagList(), [], {
    tags: ['entry'],
  });

  return fetcher();
}
