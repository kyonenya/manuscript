'use client';

import { useSearchParams } from 'next/navigation';
import { PostList } from '../(index)/PostList';
import { PostListHeader } from '../(index)/PostListHeader';
import { sampleEntries } from '../../domain/sampleEntries';

export const DemoPostList = () => {
  const searchParams = useSearchParams();

  return (
    <>
      <PostListHeader isDemoMode={true} />
      <PostList
        entries={sampleEntries}
        searchQuery={{
          keyword: searchParams.get('keyword') ?? undefined,
          tag: searchParams.get('tag') ?? undefined,
        }}
        isDemoMode={true}
      />
    </>
  );
};
