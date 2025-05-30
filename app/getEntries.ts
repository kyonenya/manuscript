'use cache';
import { unstable_cache } from 'next/cache';
import { readMany } from '../infra/entryRepository';

export const getEntries = async (props: {
  tag?: string;
  keyword?: string;
  limit?: number;
}) => {
  const { tag, keyword, limit = 300 } = props;

  return unstable_cache(
    async () => readMany({ tag, keyword, limit }),
    [tag ?? '', keyword ?? '', limit.toString()],
    {
      tags: ['entry'],
    }
  )();
};
