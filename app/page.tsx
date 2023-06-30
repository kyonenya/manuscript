import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { sampleEntries } from '../domain/Entry';
import { SearchQuery } from '../domain/SearchQuery';
import { readMany } from '../infra/entryRepository';
import { PostList, PostListSkelton } from './PostList';
import { PostListHeader } from './PostListHeader';

const PostListContainer = async ({
  isLoggedIn = false,
  searchQuery,
  isPreviewMode = false,
  isSelectMode = false,
}: {
  isLoggedIn?: boolean;
  searchQuery?: SearchQuery | undefined;
  isPreviewMode?: boolean;
  isSelectMode?: boolean;
}) => {
  const entries = isLoggedIn
    ? await readMany({
        tag: searchQuery?.tag,
        keyword: searchQuery?.keyword,
        limit: 100,
      })
    : sampleEntries;

  return (
    <PostList
      entries={entries}
      searchQuery={{ keyword: searchQuery?.keyword, tag: searchQuery?.tag }}
      isSelectMode={isSelectMode}
      isPreviewMode={isPreviewMode}
    />
  );
};

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

  const handleSignOut = async () => {
    'use server';
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();

    redirect('/login');
  };

  return (
    <>
      {!isPreviewMode && (
        <PostListHeader isSelectMode={isSelectMode} onSignOut={handleSignOut} />
      )}
      <Suspense fallback={<PostListSkelton />}>
        <PostListContainer
          isLoggedIn={!!session}
          searchQuery={{ keyword: searchParams.keyword, tag: searchParams.tag }}
          isSelectMode={isSelectMode}
          isPreviewMode={isPreviewMode}
        />
      </Suspense>
    </>
  );
}
