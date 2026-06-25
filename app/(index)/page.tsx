import { cacheTag, updateTag } from 'next/cache';
import { Entry } from '../../domain/Entry';
import {
  createMany,
  deleteAll,
  readAllUuids,
  readMany,
} from '../../infra/entryRepository';
import { PostList } from './PostList';
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
  const entries = await getCachedEntries({
    tag: searchParams.tag,
    keyword: searchParams.keyword,
    limit: 300,
  });

  const importAction = async (props: { entries: Entry[] }) => {
    'use server';
    const uuids = await readAllUuids();
    await createMany({
      entries: props.entries.filter((entry) => !uuids.includes(entry.uuid)), // duplicate exclusion
    });
    updateTag('entries');
  };

  const deleteAllAction = async () => {
    'use server';
    await deleteAll();
    updateTag('entries');
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
      <PostList
        entries={entries}
        searchQuery={{ keyword: searchParams.keyword, tag: searchParams.tag }}
        isSelectMode={isSelectMode}
        isPreviewMode={isPreviewMode}
        isAsc={searchParams.order === 'asc'}
      />
    </>
  );
}
