import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sampleEntries } from '../domain/Entry';
import { PostList } from './PostList';
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

  // if (!session) redirect('/login');

  const handleSignOut = async () => {
    'use server';
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();

    // revalidatePath('/login');
    redirect('/login');
  };

  return (
    <>
      {!isPreviewMode && (
        <PostListHeader isSelectMode={isSelectMode} onSignOut={handleSignOut} />
      )}
      <PostList
        entries={sampleEntries}
        searchQuery={{ keyword: searchParams.keyword, tag: searchParams.tag }}
        isSelectMode={isSelectMode}
        isPreviewMode={isPreviewMode}
      />
    </>
  );
}
