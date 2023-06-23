import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sampleEntries } from '../domain/Entry';
import { PostList } from './PostList';
import { PostListHeader } from './PostListHeader';

export default async function IndexPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const handleSignOut = async () => {
    'use server';
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();

    revalidatePath('/login');
  };

  return (
    <>
      <PostListHeader onSignOut={handleSignOut} />
      <PostList entries={sampleEntries} />
    </>
  );
}
