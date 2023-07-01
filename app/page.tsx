import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Entry, sampleEntries } from '../domain/Entry';
import { createMany, deleteAll, readMany } from '../infra/entryRepository';
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

  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isLoggedIn = !!session;

  const signOutAction = async () => {
    'use server';
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();
    redirect('/login');
  };

  const importAction = async (props: { entries: Entry[] }) => {
    'use server';
    await createMany(props);
    revalidatePath('/');
  };

  const deleteAllAction = async () => {
    'use server';
    await deleteAll();
    revalidatePath('/');
  };

  const LazyPostList = async () => {
    const entries = isLoggedIn
      ? await readMany({
          tag: searchParams.tag,
          keyword: searchParams.keyword,
          limit: 100,
        })
      : sampleEntries;

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
          isLoggedIn={isLoggedIn}
          isSelectMode={isSelectMode}
          signOutAction={signOutAction}
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
