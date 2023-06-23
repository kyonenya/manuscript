import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect, useParams, usePathname } from 'next/navigation';
import { sampleEntries } from '../../domain/Entry';
import { Article } from './Article';
import { ArticleHeader } from './ArticleHeader';

export default async function ArticlePage({
  params: { uuid: lowerUUID },
}: {
  params: { uuid: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const entry = sampleEntries.find(
    (entry) => entry.uuid === lowerUUID.toUpperCase()
  );

  return (
    <>
      {entry ? (
        <>
          <ArticleHeader entry={entry} />
          <Article entry={entry} />
        </>
      ) : (
        <div>Not Found</div>
      )}
    </>
  );
}
