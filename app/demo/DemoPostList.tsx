'use client';

import { useSearchParams } from 'next/navigation';
import { PostList } from '../(index)/PostList';
import { PostListHeader } from '../(index)/PostListHeader';
import { sampleEntries } from '../../domain/sampleEntries';

/**
 * Wrap this component in Suspense because of `useSearchParams`.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/use-search-params#prerendering
 */
export const DemoPostList = () => {
  const searchParams = useSearchParams();
  const searchQuery = {
    keyword: searchParams.get('keyword') ?? undefined,
    tag: searchParams.get('tag') ?? undefined,
  };

  return (
    <>
      <PostListHeader isDemoMode={true} />
      <PostList
        entries={sampleEntries.filter(
          (entry) =>
            (!searchQuery.keyword ||
              entry.text.includes(searchQuery.keyword)) &&
            (!searchQuery.tag || entry.tags.includes(searchQuery.tag)),
        )}
        searchQuery={searchQuery}
        isDemoMode={true}
      />
    </>
  );
};
