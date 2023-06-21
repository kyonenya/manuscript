import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PostListHeader } from './PostListHeader';
import { Button } from './_components/Button';
import { HeaderContainer } from './_components/HeaderContainer';

export default async function Index() {
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
      {/* <HeaderContainer>
        <PostListHeader />
      </HeaderContainer> */}

      <form>
        <Button type="submit" formAction={handleSignOut}>
          Sign Out
        </Button>
      </form>
    </>
  );
}
