import { revalidatePath } from 'next/cache';
import { Suspense } from 'react';
import { Entry } from '../domain/Entry';
// import { sampleEntries } from '../domain/sampleEntries';
import {
  createMany,
  deleteAll,
  readAllUuids,
  readMany,
} from '../infra/entryRepository';
import { PostList, PostListSkelton } from './PostList';
import { PostListHeader } from './PostListHeader';

export default async function IndexPage({
  searchParams,
}: {
  searchParams: {
    keyword?: string;
    tag?: string;
    select?: string;
    preview?: string;
  };
}) {
  const isSelectMode = !!searchParams.select;
  const isPreviewMode = !!searchParams.preview;

  // TODO: 実装する
  // const signOutAction = async () => {
  // };

  const importAction = async (props: { entries: Entry[] }) => {
    'use server';
    const uuids = await readAllUuids();
    await createMany({
      entries: props.entries.filter((entry) => !uuids.includes(entry.uuid)), // duplicate exclusion
    });
    revalidatePath('/');
  };

  const deleteAllAction = async () => {
    'use server';
    await deleteAll();
    revalidatePath('/');
  };

  const LazyPostList = async () => {
    const entries = await readMany({
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
          // signOutAction={signOutAction}
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
