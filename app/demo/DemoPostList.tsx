'use client';

import { useSearchParams } from 'next/navigation';
import { PostList } from '../(index)/PostList';
import { PostListHeader } from '../(index)/PostListHeader';
import { sampleEntries } from '../../domain/sampleEntries';

export const DemoPostList = () => {
  const searchParams = useSearchParams();
  const isPreviewMode = !!searchParams.get('preview');
  const isSelectMode = !!searchParams.get('select');

  return (
    <>
      {!isPreviewMode && (
        <PostListHeader isSelectMode={isSelectMode} isDemoMode={true} />
      )}
      <PostList
        entries={sampleEntries}
        searchQuery={{
          keyword: searchParams.get('keyword') ?? undefined,
          tag: searchParams.get('tag') ?? undefined,
        }}
        isSelectMode={isSelectMode}
        isPreviewMode={isPreviewMode}
        isDemoMode={true}
        isAsc={searchParams.get('order') === 'asc'}
      />
    </>
  );
};
