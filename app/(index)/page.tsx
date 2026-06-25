import { cacheTag, updateTag } from 'next/cache';
import { Suspense } from 'react';
import { Entry } from '../../domain/Entry';
import {
  createMany,
  deleteAll,
  readAllUuids,
  readMany,
} from '../../infra/entryRepository';
import { PostList, PostListSkelton } from './PostList';
import { PostListHeader } from './PostListHeader';

async function getCachedEntries(props: {
  tag?: string;
  keyword?: string;
  limit: number;
}) {
  'use cache';
  cacheTag('entries');
  return readMany(props);
}

async function CachedPostList(props: {
  searchParams: {
    keyword?: string;
    tag?: string;
    order?: string;
  };
  isSelectMode: boolean;
  isPreviewMode: boolean;
}) {
  const entries = await getCachedEntries({
    tag: props.searchParams.tag,
    keyword: props.searchParams.keyword,
    limit: 300,
  });

  return (
    <PostList
      entries={entries}
      searchQuery={{
        keyword: props.searchParams.keyword,
        tag: props.searchParams.tag,
      }}
      isSelectMode={props.isSelectMode}
      isPreviewMode={props.isPreviewMode}
      isAsc={props.searchParams.order === 'asc'}
    />
  );
}

export default async function IndexPage(props: {
  searchParams: Promise<{
    keyword?: string;
    tag?: string;
    select?: string;
    preview?: string;
    order?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const isSelectMode = !!searchParams.select;
  const isPreviewMode = !!searchParams.preview;

  const importAction = async (props: { entries: Entry[] }) => {
    'use server';
    const uuids = await readAllUuids();
    await createMany({
      entries: props.entries.filter((entry) => !uuids.includes(entry.uuid)), // duplicate exclusion
    });
    updateTag('entries');
    updateTag('tags');
  };

  const deleteAllAction = async () => {
    'use server';
    await deleteAll();
    updateTag('entries');
    updateTag('tags');
  };

  return (
    <>
      {!isPreviewMode && (
        <PostListHeader
          isSelectMode={isSelectMode}
          importAction={importAction}
          deleteAllAction={deleteAllAction}
        />
      )}
      <Suspense fallback={<PostListSkelton />}>
        <CachedPostList
          searchParams={searchParams}
          isSelectMode={isSelectMode}
          isPreviewMode={isPreviewMode}
        />
      </Suspense>
    </>
  );
}
