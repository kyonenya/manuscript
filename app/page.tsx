import { revalidatePath } from 'next/cache';
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
    // 削除前に全UUIDを取得
    const uuids = await readAllUuids();
    await deleteAll();
    revalidatePath('/');
    // 各個別記事ページも再検証
    uuids.forEach((uuid) => {
      revalidatePath(`/${uuid}`);
    });
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
