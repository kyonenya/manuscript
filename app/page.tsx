import { revalidateTag, unstable_cache } from 'next/cache';
import { Suspense } from 'react';
import { Entry } from '../domain/Entry';
import {
  createMany,
  deleteAll,
  readAllUuids,
  readMany,
} from '../infra/entryRepository';
import { PostList, PostListSkelton } from './PostList';
import { PostListHeader } from './PostListHeader';

export default async function IndexPage(props: {
  searchParams: Promise<{
    keyword?: string;
    tag?: string;
    select?: string;
    preview?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const isSelectMode = !!searchParams.select;
  const isPreviewMode = !!searchParams.preview;

  const getCachedEntry = unstable_cache(
    async (props: { tag?: string; keyword?: string; limit: number }) => {
      const { tag, keyword, limit } = props;
      return readMany({ tag, keyword, limit });
    },
    undefined,
    { tags: ['entry'] },
  );

  const importAction = async (props: { entries: Entry[] }) => {
    'use server';
    const uuids = await readAllUuids();
    await createMany({
      entries: props.entries.filter((entry) => !uuids.includes(entry.uuid)), // duplicate exclusion
    });
    revalidateTag('entry');
  };

  const deleteAllAction = async () => {
    'use server';
    await deleteAll();
    revalidateTag('entry');
  };

  const LazyPostList = async () => {
    const entries = await getCachedEntry({
      tag: searchParams.tag,
      keyword: searchParams.keyword,
      limit: 300,
    });

    return (
      <PostList
        entries={entries}
        searchQuery={{ keyword: searchParams.keyword, tag: searchParams.tag }}
        isSelectMode={isSelectMode}
        isPreviewMode={isPreviewMode}
      />
    );
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
        <LazyPostList />
      </Suspense>
    </>
  );
}
