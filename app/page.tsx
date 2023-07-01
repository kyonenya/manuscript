import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { sampleEntries } from '../domain/Entry';
import { readMany } from '../infra/entryRepository';
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

  const handleSignOut = async () => {
    'use server';
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();
    redirect('/login');
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
          onSignOut={handleSignOut}
        />
      )}
      <Suspense fallback={<PostListSkelton />}>
        <LazyPostList />
      </Suspense>
    </>
  );
}
