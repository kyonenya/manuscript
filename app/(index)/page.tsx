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
  };
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
    />
  );
}

export default async function IndexPage(props: {
  searchParams: Promise<{
    keyword?: string;
    tag?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

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
      <PostListHeader
        importAction={importAction}
        deleteAllAction={deleteAllAction}
      />
      <Suspense fallback={<PostListSkelton />}>
        <CachedPostList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
