import { Suspense } from 'react';
import { HeaderSkelton } from '../(index)/HeaderSkelton';
import { PostList, PostListSkelton } from '../(index)/PostList';
import { PostListHeader } from '../(index)/PostListHeader';
import { sampleEntries } from '../../domain/sampleEntries';

type SearchParams = {
  keyword?: string;
  tag?: string;
  select?: string;
  preview?: string;
  order?: string;
};

async function DemoContent(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;
  const isDemoMode = true;
  const isSelectMode = !!searchParams.select;
  const isPreviewMode = !!searchParams.preview;

  return (
    <>
      {!isPreviewMode && (
        <PostListHeader isSelectMode={isSelectMode} isDemoMode={isDemoMode} />
      )}
      <PostList
        entries={sampleEntries}
        searchQuery={{ keyword: searchParams.keyword, tag: searchParams.tag }}
        isSelectMode={isSelectMode}
        isPreviewMode={isPreviewMode}
        isDemoMode={isDemoMode}
        isAsc={searchParams.order === 'asc'}
      />
    </>
  );
}

export default function DemoIndexPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <Suspense
      fallback={
        <>
          <HeaderSkelton />
          <PostListSkelton />
        </>
      }
    >
      <DemoContent searchParams={props.searchParams} />
    </Suspense>
  );
}
